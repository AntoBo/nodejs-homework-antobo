import Joi from "joi";

const add = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    phone: Joi.string().required(),
    favorite: Joi.boolean(),
});

const updateFavorite = Joi.object({
    favorite: Joi.boolean().required(),
});

export default { add, updateFavorite };
