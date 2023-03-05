import express from "express";
import controller from "../../controllers/authController.js";
import auth from "../../middlewares/auth.js";
import { validateBody } from "../../middlewares/validateWrapper.js";
import authSchemas from "../../middlewares/validators/authSchemas.js";

const router = express.Router();

router.post("/signup", validateBody(authSchemas.signup), controller.signup);
router.post("/login", validateBody(authSchemas.login), controller.login);
router.get("/logout", auth, controller.logout);
router.get("/current", auth, controller.current);

export default router;
