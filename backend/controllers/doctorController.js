import Appointment from "../models/Appointment.js";

export const getDoctorDashboard = async (req, res) => {
  const doctorId = req.user.id;
  const data = await Appointment.find({ doctorId });
  res.json(data);
};