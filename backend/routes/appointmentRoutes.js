import express from "express";
import Appointment from "../models/Appointment.js";

const router = express.Router();

// GET all appointments
router.get("/", async (req, res) => {
  const data = await Appointment.find();
  res.json(data);
});

// GET patient appointments
router.get("/:patientId", async (req, res) => {
  const data = await Appointment.find({ patientId: req.params.patientId });
  res.json(data);
});

// CREATE appointment
router.post("/", async (req, res) => {
  const { doctorId, date } = req.body;

  const count = await Appointment.countDocuments({
    doctorId,
    date,
  });

  const newAppointment = new Appointment({
    ...req.body,
    tokenNumber: count + 1,
  });

  await newAppointment.save();

  res.json(newAppointment);
});

// UPDATE appointment status
router.patch("/:id", async (req, res) => {
  const updatedAppointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedAppointment);
});

export default router;