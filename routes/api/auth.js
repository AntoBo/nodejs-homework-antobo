import express from "express";
import { authController as controller } from "../../controllers/index.js";
import auth from "../../middlewares/auth.js";
import { validateBody } from "../../middlewares/validateWrapper.js";
import { authSchemas } from "../../middlewares/validators/index.js";

const router = express.Router();

router.post("/signup", validateBody(authSchemas.signup), controller.signup);
router.post("/login", validateBody(authSchemas.login), controller.login);
router.get("/logout", auth, controller.logout);
router.get("/current", auth, controller.current);

export default router;
