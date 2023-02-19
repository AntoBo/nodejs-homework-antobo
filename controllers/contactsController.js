import { controllerWrapper, HttpError } from "../helpers/index.js";
import model from "../models/contacts.js";

const getAll = async (req, res) => {
    const result = await model.listContacts();
    res.json(result);
};

const getById = async (req, res) => {
    const { id } = req.params;
    const result = await model.getContactById(id);
    if (!result) {
        throw HttpError(404, "Contact not found");
    }
    res.json(result);
};

const addNew = async (req, res) => {
    const result = await model.addContact(req.body);
    res.status(201).json(result);
};

const removeById = async (req, res) => {
    const { id } = req.params;
    const result = await model.removeContact(id);
    if (!result) {
        throw HttpError(422, `Contact with id ${id} not found`);
    }
    res.status(200).json(result);
};

const updateById = async (req, res) => {
    const { id } = req.params;
    const result = await model.updateContact(id, req.body);
    if (!result) {
        throw HttpError(422, `Contact with id ${id} not found`);
    }
    res.status(200).json(result);
};

export default {
    getAll: controllerWrapper(getAll),
    getById: controllerWrapper(getById),
    addNew: controllerWrapper(addNew),
    removeById: controllerWrapper(removeById),
    updateById: controllerWrapper(updateById),
};
