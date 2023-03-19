import bcrypt from "bcrypt";
import gravatar from "gravatar";
import jwt from "jsonwebtoken";
import path from "path";
import fs from "fs/promises";
import dotenv from "dotenv";
import Jimp from "jimp";
import { controllerWrapper, HttpError, emails } from "../helpers/index.js";
import { User } from "../models/index.js";
import { fileURLToPath } from "url";
import { nanoid } from "nanoid";
dotenv.config();

const { SECRET_KEY } = process.env;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const avatarsDir = path.join(__dirname, "../", "public", "avatars");

const signup = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
        throw HttpError(409, "Email already in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
    const verificationToken = nanoid();

    const newUser = await User.create({ ...req.body, password: hashPassword, avatarURL, verificationToken });

    emails.sendVerifyEmail({ email, verificationToken });

    res.status(201).json({
        email: newUser.email,
        subscription: newUser.subscription,
    });
};

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        throw HttpError(401, "Email or password is invalid");
    }

    if (!user.verified) {
        throw HttpError(401, "Email is not verified");
    }

    const passwordCompare = await bcrypt.compare(password, user.password);

    if (!passwordCompare) {
        throw HttpError(401, "Email or password is invalid");
    }

    const payload = {
        id: user._id,
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
    await User.findByIdAndUpdate(user._id, { token });

    res.json({
        token,
        user: { email: user.email, subscription: user.subscription, avatarURL: user.avatarURL },
    });
};

const logout = async (req, res) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: "" });

    res.status(204).json();
};

const current = async (req, res) => {
    const { email, subscription } = req.user;
    res.json({
        email,
        subscription,
    });
};

const updateAvatar = async (req, res) => {
    if (!req.file) {
        throw HttpError(409, "File is not attached");
    }

    const { _id } = req.user;
    const { path: tempUpload, originalname } = req.file;
    const filename = `${_id}_${originalname}`;
    const resultUpload = path.join(avatarsDir, filename);

    await Jimp.read(tempUpload)
        .then((lenna) => {
            return lenna
                .resize(250, 250) // resize
                .quality(60) // set JPEG quality
                .greyscale() // set greyscale
                .write(resultUpload); // save
        })
        .catch((err) => {
            console.error(err);
        });
    // await fs.rename(tempUpload, resultUpload);

    const avatarURL = path.join("avatars", filename);
    await User.findByIdAndUpdate(_id, { avatarURL });

    res.json({
        avatarURL,
    });
};

const verifyEmail = async (req, res) => {
    const { verificationToken } = req.params;
    const user = await User.findOne({ verificationToken });

    if (!user) {
        throw HttpError(404, "User not found");
    }

    await User.findByIdAndUpdate(user._id, { verified: true, verificationToken: "" });

    res.json({
        message: "Verification successful",
    });
};

const verifyEmailResend = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw HttpError(404, "Email not found");
    }
    if (user.verified) {
        throw HttpError(401, "Email is already verified");
    }

    const verificationToken = nanoid();
    await User.findByIdAndUpdate(user._id, { verificationToken });

    emails.sendVerifyEmail({ email, verificationToken });

    res.json({
        message: "Verification email was resent",
    });
};

export default {
    signup: controllerWrapper(signup),
    login: controllerWrapper(login),
    logout: controllerWrapper(logout),
    current: controllerWrapper(current),
    updateAvatar: controllerWrapper(updateAvatar),
    verifyEmail: controllerWrapper(verifyEmail),
    verifyEmailResend: controllerWrapper(verifyEmailResend),
};
