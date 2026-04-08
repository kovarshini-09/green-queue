import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  image: string;
  fee: number;
  availableSlots: string[];
  password: string;
}

export interface Service {
  id: string;
  name: string;
  fee: number;
  availableSlots: string[];
}

export interface Assistant {
  id: string;
  name: string;
  serviceId: string;
  password: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  status: "pending" | "completed";
  tokenNumber: number;
  fee: number;
  type: "doctor" | "service";
}

interface AppContextType {
  patients: Patient[];
  doctors: Doctor[];
  services: Service[];
  assistants: Assistant[];
  appointments: Appointment[];
  currentPatient: Patient | null;
  currentDoctor: Doctor | null;
  currentAssistant: Assistant | null;
  registerPatient: (p: Omit<Patient, "id">) => Patient;
  loginPatient: (email: string, password: string) => Patient | null;
  loginDoctor: (email: string, password: string) => Doctor | null;
  loginAssistant: (name: string, password: string) => Assistant | null;
  logoutPatient: () => void;
  logoutDoctor: () => void;
  logoutAssistant: () => void;
  bookAppointment: (apt: Omit<Appointment, "id" | "tokenNumber" | "status">) => Appointment;
  updateAppointmentStatus: (id: string, status: "pending" | "completed") => void;
  getQueueInfo: (doctorId: string, date: string, time: string) => { position: number; waitingTime: number; token: number };
  getPatientAppointments: (patientId: string) => Appointment[];
  getDoctorAppointments: (doctorId: string) => Appointment[];
  getServiceAppointments: (serviceId: string) => Appointment[];
  getDoctorStats: (doctorId: string) => { total: number; completed: number; earnings: number };
  getServiceStats: (serviceId: string) => { total: number; completed: number; earnings: number };
}

const AppContext = createContext<AppContextType | null>(null);

const defaultDoctors: Doctor[] = [
  { id: "d1", name: "Dr. Sarah Johnson", specialty: "General Physician", image: "👩‍⚕️", fee: 500, availableSlots: ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "14:00", "14:30", "15:00", "15:30"], password: "doctor123" },
  { id: "d2", name: "Dr. Michael Chen", specialty: "Cardiologist", image: "👨‍⚕️", fee: 800, availableSlots: ["09:00", "09:30", "10:00", "10:30", "11:00", "14:00", "14:30", "15:00"], password: "doctor123" },
  { id: "d3", name: "Dr. Emily Davis", specialty: "Dermatologist", image: "👩‍⚕️", fee: 600, availableSlots: ["10:00", "10:30", "11:00", "11:30", "14:00", "14:30", "15:00", "15:30", "16:00"], password: "doctor123" },
  { id: "d4", name: "Dr. James Wilson", specialty: "Orthopedic", image: "👨‍⚕️", fee: 700, availableSlots: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"], password: "doctor123" },
  { id: "d5", name: "Dr. Priya Sharma", specialty: "Pediatrician", image: "👩‍⚕️", fee: 550, availableSlots: ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "14:00", "14:30"], password: "doctor123" },
  { id: "d6", name: "Dr. Robert Lee", specialty: "ENT Specialist", image: "👨‍⚕️", fee: 650, availableSlots: ["09:00", "10:00", "11:00", "14:00", "15:00"], password: "doctor123" },
  { id: "d7", name: "Dr. Ravi Kumar", specialty: "Neurologist", image: "👨‍⚕️", fee: 750, availableSlots: ["09:00", "10:00", "11:00", "14:00", "15:00"], password: "doctor123" },
  { id: "d8", name: "Dr. Anjali Mehta", specialty: "Ophthalmologist", image: "👩‍⚕️", fee: 500, availableSlots: ["09:00", "09:30", "10:00", "10:30", "14:00", "14:30"], password: "doctor123" },
  { id: "d9", name: "Dr. Karthika Raj", specialty: "Psychiatrist", image: "👨‍⚕️", fee: 900, availableSlots: ["10:00", "11:00", "12:00", "15:00", "16:00"], password: "doctor123" },
];

const defaultServices: Service[] = [
  { id: "s1", name: "Blood Pressure", fee: 200, availableSlots: ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "14:00", "14:30", "15:00", "15:30", "16:00"] },
  { id: "s2", name: "Thyroid", fee: 500, availableSlots: ["09:00", "09:30", "10:00", "10:30", "11:00", "14:00", "14:30", "15:00"] },
  { id: "s3", name: "X-Ray", fee: 800, availableSlots: ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00"] },
  { id: "s4", name: "CT Scan", fee: 3000, availableSlots: ["09:00", "10:00", "11:00", "14:00", "15:00"] },
  { id: "s5", name: "Sugar Test", fee: 250, availableSlots: ["09:00","10:00","11:00","14:00"] },
{ id: "s6", name: "MRI Scan", fee: 3500, availableSlots: ["09:00","11:00","14:00","16:00"] },
{ id: "s7", name: "Glucose Test", fee: 200, availableSlots: ["09:00","10:00","11:00","15:00"] },
  
];

const defaultAssistants: Assistant[] = [
  { id: "a1", name: "BP Assistant", serviceId: "s1", password: "assistant123" },
  { id: "a2", name: "Thyroid Assistant", serviceId: "s2", password: "assistant123" },
  { id: "a3", name: "X-Ray Assistant", serviceId: "s3", password: "assistant123" },
  { id: "a4", name: "CT Scan Assistant", serviceId: "s4", password: "assistant123" },
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [patients, setPatients] = useState<Patient[]>(() => {
    const saved = localStorage.getItem("hq_patients");
    return saved ? JSON.parse(saved) : [];
  });
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem("hq_appointments");
    return saved ? JSON.parse(saved) : [];
  });
  const [currentPatient, setCurrentPatient] = useState<Patient | null>(() => {
    const saved = localStorage.getItem("hq_currentPatient");
    return saved ? JSON.parse(saved) : null;
  });
  const [currentDoctor, setCurrentDoctor] = useState<Doctor | null>(() => {
    const saved = localStorage.getItem("hq_currentDoctor");
    return saved ? JSON.parse(saved) : null;
  });
  const [currentAssistant, setCurrentAssistant] = useState<Assistant | null>(() => {
    const saved = localStorage.getItem("hq_currentAssistant");
    return saved ? JSON.parse(saved) : null;
  });

  const doctors = defaultDoctors;
  const services = defaultServices;
  const assistants = defaultAssistants;

  useEffect(() => { localStorage.setItem("hq_patients", JSON.stringify(patients)); }, [patients]);
  useEffect(() => { localStorage.setItem("hq_appointments", JSON.stringify(appointments)); }, [appointments]);
  useEffect(() => { localStorage.setItem("hq_currentPatient", JSON.stringify(currentPatient)); }, [currentPatient]);
  useEffect(() => { localStorage.setItem("hq_currentDoctor", JSON.stringify(currentDoctor)); }, [currentDoctor]);
  useEffect(() => { localStorage.setItem("hq_currentAssistant", JSON.stringify(currentAssistant)); }, [currentAssistant]);

  const registerPatient = (p: Omit<Patient, "id">) => {
    const newPatient: Patient = { ...p, id: "p" + Date.now() };
    setPatients(prev => [...prev, newPatient]);
    setCurrentPatient(newPatient);
    return newPatient;
  };

  const loginPatient = (email: string, password: string) => {
    const p = patients.find(pt => pt.email === email && pt.password === password);
    if (p) { setCurrentPatient(p); return p; }
    return null;
  };

  const loginDoctor = (email: string, password: string) => {
    const d = doctors.find(doc => doc.name.toLowerCase().replace(/\s+/g, "") === email.toLowerCase().replace(/\s+/g, "") && doc.password === password);
    if (d) { setCurrentDoctor(d); return d; }
    return null;
  };

  const loginAssistant = (name: string, password: string) => {
    const a = assistants.find(ast => ast.name.toLowerCase().replace(/\s+/g, "") === name.toLowerCase().replace(/\s+/g, "") && ast.password === password);
    if (a) { setCurrentAssistant(a); return a; }
    return null;
  };

  const logoutPatient = () => { setCurrentPatient(null); localStorage.removeItem("hq_currentPatient"); };
  const logoutDoctor = () => { setCurrentDoctor(null); localStorage.removeItem("hq_currentDoctor"); };
  const logoutAssistant = () => { setCurrentAssistant(null); localStorage.removeItem("hq_currentAssistant"); };

  const bookAppointment = (apt: Omit<Appointment, "id" | "tokenNumber" | "status">) => {
    const sameDayDoctor = appointments.filter(a => a.doctorId === apt.doctorId && a.date === apt.date);
    const tokenNumber = sameDayDoctor.length + 1;
    const newApt: Appointment = { ...apt, id: "a" + Date.now(), tokenNumber, status: "pending" };
    setAppointments(prev => [...prev, newApt]);
    return newApt;
  };

  const updateAppointmentStatus = (id: string, status: "pending" | "completed") => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status } : a));
  };

  const getQueueInfo = (doctorId: string, date: string, time: string) => {
    const sameDayDoctor = appointments.filter(a => a.doctorId === doctorId && a.date === date && a.status === "pending");
    const beforeMe = sameDayDoctor.filter(a => a.time <= time);
    const position = beforeMe.length + 1;
    const waitingTime = beforeMe.length * 15;
    const token = sameDayDoctor.length + 1;
    return { position, waitingTime, token };
  };

  const getPatientAppointments = (patientId: string) => appointments.filter(a => a.patientId === patientId);
  const getDoctorAppointments = (doctorId: string) => appointments.filter(a => a.doctorId === doctorId);
  const getServiceAppointments = (serviceId: string) => appointments.filter(a => a.doctorId === serviceId && a.type === "service");

  const getDoctorStats = (doctorId: string) => {
    const docApts = appointments.filter(a => a.doctorId === doctorId);
    const completed = docApts.filter(a => a.status === "completed");
    return { total: docApts.length, completed: completed.length, earnings: completed.reduce((s, a) => s + a.fee, 0) };
  };

  const getServiceStats = (serviceId: string) => {
    const svcApts = appointments.filter(a => a.doctorId === serviceId && a.type === "service");
    const completed = svcApts.filter(a => a.status === "completed");
    return { total: svcApts.length, completed: completed.length, earnings: completed.reduce((s, a) => s + a.fee, 0) };
  };

  return (
    <AppContext.Provider value={{ patients, doctors, services, assistants, appointments, currentPatient, currentDoctor, currentAssistant, registerPatient, loginPatient, loginDoctor, loginAssistant, logoutPatient, logoutDoctor, logoutAssistant, bookAppointment, updateAppointmentStatus, getQueueInfo, getPatientAppointments, getDoctorAppointments, getServiceAppointments, getDoctorStats, getServiceStats }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
};
