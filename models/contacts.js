import { Schema, model } from "mongoose";
import Joi from "joi";
import handleMongooseError from "../helpers/handleMongooseError.js";

const contactsSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Set name for contact"],
        },
        email: {
            type: String,
        },
        phone: {
            type: String,
            required: [true, "Set phone for contact"],
        },
        favorite: {
            type: Boolean,
            default: false,
        },
    },
    { versionKey: false, timestamps: true }
);

contactsSchema.post("save", handleMongooseError);

export const Contact = model("contact", contactsSchema);
