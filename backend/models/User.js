import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  phone: String,
  password: String,
  role: { type: String, default: "patient" },
  serviceId: String,
});

export default mongoose.model("User", userSchema);