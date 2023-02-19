import express from "express";
import controller from "../../controllers/contactsController.js";
import { validateBody } from "../../middlewares/validateWrapper.js";
import contactsSchemas from "../../middlewares/validators/contactsSchemas.js";

const router = express.Router();

router.get("/", controller.getAll);

router.get("/:id", controller.getById);

router.post("/", validateBody(contactsSchemas.add), controller.addNew);

router.put("/:id", validateBody(contactsSchemas.add), controller.updateById);

router.delete("/:id", controller.removeById);

export default router;
