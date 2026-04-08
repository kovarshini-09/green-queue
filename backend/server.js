import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import doctorRoutes from "./routes/doctorRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/UserRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import { seedDoctors, seedServices } from "./seed/seedData.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const startServer = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/mediqueue");
    console.log("MongoDB Connected");
    await seedDoctors();
    await seedServices();
  } catch (err) {
    console.error(err);
  }
};

startServer();

app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/patients", userRoutes);
app.use("/api/services", serviceRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));