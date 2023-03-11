import Joi from "joi";

const signup = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().min(6).required(),
});

const login = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
});

export default { signup, login };
