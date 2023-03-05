import express from "express";
import morgan from "morgan";
import cors from "cors";
import contactsRouter from "./routes/api/contacts.js";
import authRouter from "./routes/api/auth.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
// const formatsLogger = app.get("env") === "development" ? "dev" : "short";
// app.use(morgan(formatsLogger));

app.use(cors());
app.use(express.json());

// ROUTS
app.use("/api/contacts", contactsRouter);
app.use("/api/users", authRouter);

// 404 ROUTE
app.use((req, res) => {
    res.status(404).json({ message: "Not found" });
});

// ERROR ROUTER
app.use((err, req, res, next) => {
    const { status = 500, message } = err;
    res.status(status).json({ message });
});

export default app;
