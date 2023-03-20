import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";
dotenv.config();

const { SENDGRID_API_KEY, BASE_URL, PORT, SENDGRID_SENDER } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendVerifyEmail = async ({ email, verificationToken }) => {
    const link = `${BASE_URL}:${PORT}/api/users/verify/${verificationToken}`;
    const mail = {
        to: email,
        from: SENDGRID_SENDER,
        subject: "Verify email",
        html: `<p>You need to verify your e-mail by clicking <b><a target="_blank" href=${link}>here</a></b></p>
        <p>Or paste this link in browser: <b><a target="_blank" href=${link}>${link}</a></b></p>`,
    };

    await sgMail.send(mail);
    return true;
};

export { sendVerifyEmail };
