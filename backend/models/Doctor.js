import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  id: String,
  name: String,
  specialty: String,
  fee: Number,
  availableSlots: [String]
});

export default mongoose.model("Doctor", doctorSchema);