import HttpError from "../helpers/HttpError.js";

const validateBody = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            next(HttpError(422, error.message));
        }
        next();
    };
};

export { validateBody };
