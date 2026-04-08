import Appointment from "../models/Appointment.js";
import Doctor from "../models/Doctor.js";
import Service from "../models/Service.js";
import { calculateQueue } from "../utils/queueLogic.js";

// ✅ BOOK APPOINTMENT
export const bookAppointment = async (req, res) => {
  try {
    const { type, doctorId, serviceId, date, timeSlot } = req.body;

    // Get existing appointments for same slot
    const existing = await Appointment.find({
      date,
      timeSlot,
      type,
      ...(type === "doctor" ? { doctorId } : { serviceId }),
    });

    // Queue calculation
    const { queuePosition, tokenNumber, waitingTime } =
      calculateQueue(existing);

    let fees = 0;

    if (type === "doctor") {
      const doctor = await Doctor.findById(doctorId);
      if (!doctor) {
        return res.status(404).json({ message: "Doctor not found" });
      }
      fees = doctor.fees;
    } else {
      const service = await Service.findById(serviceId);
      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }
      fees = service.fees;
    }

    const appointment = new Appointment({
      userId: req.user?.id, // safe check
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

    res.status(201).json(appointment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ COMPLETE APPOINTMENT (Doctor/Service Dashboard)
export const completeAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    appointment.status = "completed";
    await appointment.save();

    if (appointment.type === "doctor") {
      const doctor = await Doctor.findById(appointment.doctorId);
      if (doctor) {
        doctor.earnings += appointment.fees;
        doctor.completedAppointments += 1;
        doctor.totalAppointments += 1;
        await doctor.save();
      }
    } else {
      const service = await Service.findById(appointment.serviceId);
      if (service) {
        service.earnings += appointment.fees;
        service.completedAppointments += 1;
        service.totalAppointments += 1;
        await service.save();
      }
    }

    res.json({ message: "Completed & updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};