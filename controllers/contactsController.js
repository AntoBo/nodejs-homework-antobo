import { controllerWrapper, HttpError } from "../helpers/index.js";
import { Contact } from "../models/contacts.js";

const getAll = async (req, res) => {
    const { _id } = req.user;

    const result = await Contact.find({ owner: _id });
    res.json(result);
};

const getById = async (req, res) => {
    const { id } = req.params;
    const result = await Contact.findById(id);
    if (!result) {
        throw HttpError(404, "Contact not found");
    }
    res.json(result);
};

const addNew = async (req, res) => {
    const { _id } = req.user;

    const result = await Contact.create({ ...req.body, owner: _id });
    res.status(201).json(result);
};

const removeById = async (req, res) => {
    const { id } = req.params;
    const result = await Contact.findByIdAndRemove(id);
    if (!result) {
        throw HttpError(422, `Contact with id ${id} not found`);
    }
    res.status(200).json(result);
};

const updateById = async (req, res) => {
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
    if (!result) {
        throw HttpError(422, `Contact with id ${id} not found`);
    }
    res.status(200).json(result);
};

const updateFavorite = async (req, res) => {
    const { id } = req.params;
    const { favorite } = req.body;

    const result = await Contact.findByIdAndUpdate(id, { favorite }, { new: true });
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
    updateFavorite: controllerWrapper(updateFavorite),
};
