import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import problemRoutes from "./routes/problem.routes";
import { initConsumers } from './queues/consumer';

import dbConnect from "./libs/dbConnect.lib";

dotenv.config();

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/api/v1", problemRoutes);

const PORT = process.env.PORT ?? 5771

const startServer = async () => {
  try {
    // Connect to MongoDB
    await dbConnect();
    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
initConsumers();