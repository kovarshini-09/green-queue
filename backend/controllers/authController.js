import User from "../models/User.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

export const register = async (req, res) => {
  try {
    const user = await User.create(req.body);
    const token = jwt.sign({ id: user._id, role: user.role, serviceId: user.serviceId }, JWT_SECRET);
    return res.json({ user, token, role: user.role });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern?.email) {
      return res.status(400).json({ msg: "Email already exists. Please use a different email." });
    }
    console.error("Register error:", error);
    return res.status(500).json({ msg: "Unable to register user" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role, serviceId: user.serviceId }, JWT_SECRET);
    return res.json({ user, token, role: user.role });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ msg: "Unable to login user" });
  }
};