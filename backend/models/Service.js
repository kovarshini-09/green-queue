import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  id: String,
  name: String,
  serviceType: String,
  fees: Number,
  availableSlots: [String],
  totalAppointments: { type: Number, default: 0 },
  completedAppointments: { type: Number, default: 0 },
  earnings: { type: Number, default: 0 },
});

export default mongoose.model("Service", serviceSchema);