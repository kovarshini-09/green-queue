import { createContext, useContext, useEffect, useState } from "react";
import * as api from "@/services/api";

const defaultDoctors = [
  {
    id: "d1",
    name: "Dr. Sarah Johnson",
    specialty: "General Physician",
    fee: 450,
    availableSlots: ["09:00", "10:00", "11:00", "14:00", "15:00"],
  },
  {
    id: "d2",
    name: "Dr. James Patel",
    specialty: "Cardiologist",
    fee: 550,
    availableSlots: ["09:30", "10:30", "11:30", "14:30", "15:30"],
  },
  {
    id: "d3",
    name: "Dr. Meera Singh",
    specialty: "Dermatologist",
    fee: 500,
    availableSlots: ["09:00", "10:00", "12:00", "13:00", "16:00"],
  },
  {
    id: "d4",
    name: "Dr. Arjun Rao",
    specialty: "Orthopedic",
    fee: 600,
    availableSlots: ["10:00", "11:00", "14:00", "15:00", "16:00"],
  },
  {
    id: "d5",
    name: "Dr. Nisha Kapoor",
    specialty: "Pediatrician",
    fee: 400,
    availableSlots: ["09:00", "10:30", "11:30", "13:30", "15:00"],
  },
  {
    id: "d6",
    name: "Dr. Ravi Singh",
    specialty: "ENT Specialist",
    fee: 480,
    availableSlots: ["09:30", "10:30", "12:30", "14:30", "15:30"],
  },
  {
    id: "d7",
    name: "Dr. Priya Sharma",
    specialty: "Gynecologist",
    fee: 520,
    availableSlots: ["09:00", "10:00", "11:00", "14:00", "15:00"],
  },
  {
    id: "d8",
    name: "Dr. Vikram Gupta",
    specialty: "Neurologist",
    fee: 650,
    availableSlots: ["09:30", "10:30", "11:30", "14:30", "15:30"],
  },
  {
    id: "d9",
    name: "Dr. Anjali Verma",
    specialty: "Psychiatrist",
    fee: 500,
    availableSlots: ["09:00", "10:00", "12:00", "13:00", "16:00"],
  },
  {
    id: "d10",
    name: "Dr. Karan Mehta",
    specialty: "Urologist",
    fee: 580,
    availableSlots: ["10:00", "11:00", "14:00", "15:00", "16:00"],
  },
  {
    id: "d11",
    name: "Dr. Sneha Agarwal",
    specialty: "Endocrinologist",
    fee: 550,
    availableSlots: ["09:00", "10:30", "11:30", "13:30", "15:00"],
  },
  {
    id: "d12",
    name: "Dr. Rohan Jain",
    specialty: "Ophthalmologist",
    fee: 490,
    availableSlots: ["09:30", "10:30", "12:30", "14:30", "15:30"],
  },
];

const defaultServices = [
  {
    id: "s1",
    name: "Blood Pressure Check",
    fee: 199,
    availableSlots: ["09:00", "10:00", "11:00", "14:00", "15:00"],
  },
  {
    id: "s2",
    name: "Thyroid Test",
    fee: 299,
    availableSlots: ["09:30", "10:30", "11:30", "14:30", "15:30"],
  },
  {
    id: "s3",
    name: "X-Ray",
    fee: 499,
    availableSlots: ["09:00", "10:00", "12:00", "13:00", "16:00"],
  },
  {
    id: "s4",
    name: "CT Scan",
    fee: 899,
    availableSlots: ["10:00", "11:00", "14:00", "15:00", "16:00"],
  },
  {
    id: "s5",
    name: "Blood Sugar Test",
    fee: 149,
    availableSlots: ["09:00", "10:30", "11:30", "13:30", "15:00"],
  },
  {
    id: "s6",
    name: "MRI",
    fee: 1299,
    availableSlots: ["09:00", "11:00", "14:00", "16:00"],
  },
  {
    id: "s7",
    name: "Glucose Test",
    fee: 129,
    availableSlots: ["09:30", "10:30", "12:30", "14:30", "15:30"],
  },
];

const assistantAccounts = [
  { id: "a1", name: "BP Assistant", serviceId: "s1" },
  { id: "a2", name: "Thyroid Assistant", serviceId: "s2" },
  { id: "a3", name: "X-Ray Assistant", serviceId: "s3" },
  { id: "a4", name: "CT Assistant", serviceId: "s4" },
];

const AppContext = createContext<any>(null);

export const AppProvider = ({ children }: any) => {
  const [doctors, setDoctors] = useState(defaultDoctors);
  const [appointments, setAppointments] = useState([]);
  const [services, setServices] = useState(defaultServices);
  const [currentPatient, setCurrentPatient] = useState<any>(null);
  const [currentDoctor, setCurrentDoctor] = useState<any>(null);
  const [currentAssistant, setCurrentAssistant] = useState<any>(null);

  const normalizeUser = (user: any) =>
    user ? { ...user, id: user.id || user._id } : user;

  useEffect(() => {
    const storedPatient = localStorage.getItem("currentPatient");
    const storedDoctor = localStorage.getItem("currentDoctor");
    const storedAssistant = localStorage.getItem("currentAssistant");

    if (storedPatient) setCurrentPatient(normalizeUser(JSON.parse(storedPatient)));
    if (storedDoctor) setCurrentDoctor(JSON.parse(storedDoctor));
    if (storedAssistant) setCurrentAssistant(JSON.parse(storedAssistant));

    loadDoctors();
    loadServices();
    loadAppointments();
  }, []);

  const normalizeDoctors = (data: any[]) =>
    data.map((doc) => ({
      ...doc,
      id: doc.id || doc._id || doc.name?.toLowerCase().replace(/\s+/g, "-"),
      fee: doc.fee ?? doc.fees,
    }));

  const normalizeServices = (data: any[]) =>
    data.map((service) => ({
      ...service,
      id: service.id || service._id || service.name?.toLowerCase().replace(/\s+/g, "-"),
      fee: service.fee ?? service.fees,
    }));

  const normalizeAppointments = (data: any[]) =>
    data.map((apt) => ({
      ...apt,
      id: apt.id || apt._id,
      fee: apt.fee ?? apt.fees,
      tokenNumber: apt.tokenNumber ?? apt.token,
    }));

  const loadDoctors = async () => {
    try {
      const data = await api.getDoctors();
      if (Array.isArray(data) && data.length > 0) {
        setDoctors(normalizeDoctors(data));
      }
    } catch (error) {
      console.error("Failed to load doctors", error);
    }
  };

  const loadServices = async () => {
    try {
      const data = await api.getServices();
      if (Array.isArray(data) && data.length > 0) {
        setServices(normalizeServices(data));
      }
    } catch (error) {
      console.error("Failed to load services", error);
    }
  };

  const loadAppointments = async () => {
    try {
      const data = await api.getAppointments();
      setAppointments(Array.isArray(data) ? normalizeAppointments(data) : []);
    } catch (error) {
      console.error("Failed to load appointments", error);
    }
  };

  const refreshData = async () => {
    await Promise.all([loadDoctors(), loadServices(), loadAppointments()]);
  };

  const persist = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const bookAppointment = async (data: any) => {
    try {
      const appointment = await api.createAppointment(data);
      if (!appointment) return null;
      setAppointments(prev => [...prev, { ...appointment, id: appointment.id || appointment._id }]);
      return appointment;
    } catch (error) {
      console.error("Failed to create appointment", error);
      return null;
    }
  };

  const updateAppointmentStatus = async (appointmentId: string, status: string) => {
    try {
      const updated = await api.updateAppointmentStatus(appointmentId, { status });
      if (!updated) return null;
      const normalizedUpdated = {
        ...updated,
        id: updated.id || updated._id,
        fee: updated.fee ?? updated.fees,
        tokenNumber: updated.tokenNumber ?? updated.token,
      };
      setAppointments(prev => prev.map((apt: any) => (apt.id === normalizedUpdated.id ? normalizedUpdated : apt)));
      return normalizedUpdated;
    } catch (error) {
      console.error("Failed to update appointment status", error);
      return null;
    }
  };

  const getDoctorAppointments = (doctorId: string) =>
    appointments.filter((a: any) => a.doctorId === doctorId);

  const getServiceAppointments = (serviceId: string) =>
    appointments.filter((a: any) => a.doctorId === serviceId);

  const getDoctorStats = (doctorId: string) => {
    const target = getDoctorAppointments(doctorId);
    const total = target.length;
    const completed = target.filter((a: any) => a.status === "completed").length;
    const earnings = target.reduce((sum: number, apt: any) => sum + (apt.status === "completed" ? Number(apt.fee || 0) : 0), 0);
    return { total, completed, earnings };
  };

  const getServiceStats = (serviceId: string) => {
    const target = getServiceAppointments(serviceId);
    const total = target.length;
    const completed = target.filter((a: any) => a.status === "completed").length;
    const earnings = target.reduce((sum: number, apt: any) => sum + (apt.status === "completed" ? Number(apt.fee || 0) : 0), 0);
    return { total, completed, earnings };
  };

  const loginDoctor = (name: string, password: string) => {
    if (password !== "doctor123") return null;
    const doctor = doctors.find((d: any) => d.name.toLowerCase() === name.trim().toLowerCase());
    if (!doctor) return null;
    setCurrentDoctor(doctor);
    persist("currentDoctor", doctor);
    return doctor;
  };

  const logoutDoctor = () => {
    setCurrentDoctor(null);
    localStorage.removeItem("currentDoctor");
  };

  const loginAssistant = (name: string, password: string) => {
    if (password !== "assistant123") return null;
    const assistant = assistantAccounts.find((a) => a.name.toLowerCase() === name.trim().toLowerCase());
    if (!assistant) return null;
    setCurrentAssistant(assistant);
    persist("currentAssistant", assistant);
    return assistant;
  };

  const logoutAssistant = () => {
    setCurrentAssistant(null);
    localStorage.removeItem("currentAssistant");
  };

  const logoutPatient = () => {
    setCurrentPatient(null);
    localStorage.removeItem("currentPatient");
  };

  const getPatientAppointments = (id: string) =>
    appointments.filter((a: any) => a.patientId === id);

  const getQueueInfo = (doctorId: string, date: string) => {
    const pending = appointments.filter(
      (a: any) =>
        a.doctorId === doctorId &&
        a.date === date &&
        a.status === "pending"
    );

    return {
      position: pending.length + 1,
      waitingTime: pending.length * 15,
      token: pending.length + 1,
    };
  };

  return (
    <AppContext.Provider
      value={{
        doctors,
        services,
        appointments,
        currentPatient,
        currentDoctor,
        currentAssistant,
        setCurrentPatient,
        loginDoctor,
        loginAssistant,
        logoutPatient,
        logoutDoctor,
        logoutAssistant,
        bookAppointment,
        getDoctorAppointments,
        getServiceAppointments,
        getDoctorStats,
        getServiceStats,
        updateAppointmentStatus,
        getPatientAppointments,
        getQueueInfo,
        refreshData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);