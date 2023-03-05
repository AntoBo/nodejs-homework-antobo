import { Schema, model } from "mongoose";
import { handleMongooseError } from "../helpers/index.js";

const signupSchema = new Schema(
    {
        password: {
            type: String,
            required: [true, "Password is required"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
        },
        subscription: {
            type: String,
            enum: ["starter", "pro", "business"],
            default: "starter",
        },
        token: {
            type: String,
            default: null,
        },
    },
    { versionKey: false, timestamps: true }
);

signupSchema.post("save", handleMongooseError);

export const User = model("user", signupSchema);
