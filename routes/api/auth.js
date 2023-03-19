import express from "express";
import { authController as controller } from "../../controllers/index.js";
import auth from "../../middlewares/auth.js";
import { validateBody, upload } from "../../middlewares/index.js";
import { authSchemas } from "../../middlewares/validators/index.js";

const router = express.Router();

//prefix /api/users
router.post("/signup", validateBody(authSchemas.signup), controller.signup);
router.post("/login", validateBody(authSchemas.login), controller.login);
router.get("/logout", auth, controller.logout);
router.get("/current", auth, controller.current);
router.patch("/avatars", auth, upload.single("avatar"), controller.updateAvatar);
router.get("/verify/:verificationToken", controller.verifyEmail);
router.post("/verify/resend", controller.verifyEmailResend);

export default router;
