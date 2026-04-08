import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  patientId: String,
  patientName: String,
  doctorId: String,
  doctorName: String,
  date: String,
  time: String,
  fee: Number,
  tokenNumber: Number,
  status: { type: String, default: "pending" }
});

export default mongoose.model("Appointment", appointmentSchema);