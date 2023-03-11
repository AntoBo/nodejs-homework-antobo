import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const tempDir = path.join(__dirname, "../", "tmp");

const multerConfig = multer.diskStorage({
    destination: tempDir,
    filename: (req, file, cb) => {
        cb(null, req.user._id + "_" + file.originalname);
    },
});

const upload = multer({
    storage: multerConfig,
});

export { upload };
