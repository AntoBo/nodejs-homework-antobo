import mongoose from "mongoose";
import app from "./app.js";

//Dt7pO42uejx2KW6q

const { DB_HOST, PORT = 3000 } = process.env;

mongoose.set("strictQuery", true);

mongoose
    .connect(DB_HOST)
    .then(() => {
        app.listen(PORT);
        console.log("Database connection successful");
    })
    .catch((err) => {
        console.log(err.message);
        process.exit(1);
    });

// app.listen(3000, () => {
//     console.log("Server is running. Use our API on port: 3000");
// });
