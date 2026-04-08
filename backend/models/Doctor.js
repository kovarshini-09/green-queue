import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  name: String,
  specialization: String,
  fees: Number,
  availableSlots: [String],
  totalAppointments: { type: Number, default: 0 },
  completedAppointments: { type: Number, default: 0 },
  earnings: { type: Number, default: 0 },
});

export default mongoose.model("Doctor", doctorSchema);