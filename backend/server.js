import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use("/api/appointments", appointmentRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));