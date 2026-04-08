import Appointment from "../models/Appointment.js";
import Service from "../models/Service.js";

export const getServiceDashboard = async (req, res) => {
  const serviceId = req.user.serviceId;
  const data = await Appointment.find({ serviceId });
  res.json(data);
};

export const getAllServices = async (req, res) => {
  try {
    const services = await Service.find({});
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: "Error fetching services" });
  }
};