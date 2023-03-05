import { isValidObjectId } from "mongoose";

import { HttpError } from "../../helpers/index.js";

export default (req, res, next) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
        next(HttpError(422, `${id} is not valid id`));
    }
    next();
};
