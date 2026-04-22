import express from "express";
import issueRouter from "./routes/issueRoutes";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import { errorHandler } from "./middlewares/errorHanlder";
import cors from "cors";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

app.use(express.json());

connectDB();

app.use("/api/issues", issueRouter);

app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

app.use(errorHandler);

// unhandled promise rejections
process.on("unhandledRejection", (err: Error) => {
  console.error("Unhandled Rejection:", err.message);
  process.exit(1);
});

// uncaught exceptions
process.on("uncaughtException", (err: Error) => {
  console.error("Uncaught Exception:", err.message);
  process.exit(1);
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log("Server started in port: ", PORT);
});
