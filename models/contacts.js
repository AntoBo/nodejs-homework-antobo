import { Schema, model, SchemaTypes } from "mongoose";
import { handleMongooseError } from "../helpers/index.js";

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
        owner: {
            type: SchemaTypes.ObjectId,
            ref: "user",
        },
    },
    { versionKey: false, timestamps: true }
);

contactsSchema.post("save", handleMongooseError);

export const Contact = model("contact", contactsSchema);
