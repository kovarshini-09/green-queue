import express from "express";
import Doctor from "../models/Doctor.js";

const router = express.Router();

// GET all doctors
router.get("/", async (req, res) => {
  const doctors = await Doctor.find();
  res.json(doctors);
});

// ADD doctor (optional)
router.post("/", async (req, res) => {
  const doctor = new Doctor(req.body);
  await doctor.save();
  res.json(doctor);
});

export default router;