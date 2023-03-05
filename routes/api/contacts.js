import express from "express";
import { contactsController as controller } from "../../controllers/index.js";
import { validateBody } from "../../middlewares/index.js";
import { isValidId, contactsSchemas } from "../../middlewares/validators/index.js";
import { auth } from "../../middlewares/index.js";

const router = express.Router();

router.use(auth);
router.get("/", controller.getAll);
router.get("/:id", isValidId, controller.getById);
router.post("/", validateBody(contactsSchemas.add), controller.addNew);
router.put("/:id", validateBody(contactsSchemas.add), controller.updateById);
router.delete("/:id", isValidId, controller.removeById);
router.patch("/:id/favorite", isValidId, validateBody(contactsSchemas.updateFavorite), controller.updateFavorite);

export default router;
