import express from "express"
import router from "./routes/issueRoutes";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import { errorHandler } from "./middlewares/errorHanlder";

dotenv.config();

const app = express();
app.use(express.json());

connectDB();

app.use('/api/issues', router);

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
})

