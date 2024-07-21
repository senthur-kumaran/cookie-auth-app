import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";

import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import config from "./config/config.js";
import verifyToken from "./middleware/authenticate.js";
import rateLimiter from "./middleware/rateLimiter.js";
import sanitizeInput from "./middleware/sanitizeInput.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

app.use(cors());
app.use(helmet()); // set various HTTP headers to enhance security
app.use(express.json());
app.use(sanitizeInput);
app.use(cookieParser());
app.use(rateLimiter);
app.use(morgan("dev"));

mongoose
  .connect(config.dbUri)
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });

app.use("/api", authRoutes);
app.use("/api/users", verifyToken, userRoutes);

app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`App is running on port ${config.port}`);
});
