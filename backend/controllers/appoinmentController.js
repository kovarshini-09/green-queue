import Appointment from "../models/Appointment.js";
import Doctor from "../models/Doctor.js";
import Service from "../models/Service.js";
import { calculateQueue } from "../utils/queueLogic.js";

export const bookAppointment = async (req, res) => {
  try {
    const { type, doctorId, serviceId, date, timeSlot } = req.body;

    const existing = await Appointment.find({
      date,
      timeSlot,
      type,
      ...(type === "doctor" ? { doctorId } : { serviceId }),
    });

    const { queuePosition, tokenNumber, waitingTime } =
      calculateQueue(existing);

    let fees = 0;

    if (type === "doctor") {
      const doctor = await Doctor.findById(doctorId);
      fees = doctor.fees;
    } else {
      const service = await Service.findById(serviceId);
      fees = service.fees;
    }

    const appointment = new Appointment({
      userId: req.user.id,
      doctorId,
      serviceId,
      type,
      date,
      timeSlot,
      status: "booked",
      tokenNumber,
      queuePosition,
      waitingTime,
      fees,
    });

    await appointment.save();
    res.json(appointment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const completeAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await Appointment.findById(id);
    appointment.status = "completed";
    await appointment.save();

    if (appointment.type === "doctor") {
      const doctor = await Doctor.findById(appointment.doctorId);
      doctor.earnings += appointment.fees;
      doctor.completedAppointments += 1;
      doctor.totalAppointments += 1;
      await doctor.save();
    } else {
      const service = await Service.findById(appointment.serviceId);
      service.earnings += appointment.fees;
      service.completedAppointments += 1;
      service.totalAppointments += 1;
      await service.save();
    }

    res.json({ message: "Completed & updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};