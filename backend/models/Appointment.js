import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
  serviceId: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
  type: String, // doctor / service
  date: String,
  timeSlot: String,
  status: { type: String, default: "booked" },
  tokenNumber: Number,
  queuePosition: Number,
  waitingTime: Number,
  fees: Number,
});

export default mongoose.model("Appointment", appointmentSchema);