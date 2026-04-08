import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.json(user);
});

export default router;