import Doctor from "../models/Doctor.js";
import Service from "../models/Service.js";

export const seedDoctors = async () => {
  // Always reseed for now
  await Doctor.deleteMany({});

  const doctors = [
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

  await Doctor.insertMany(doctors);
  console.log("Seeded default doctors.");
};

export const seedServices = async () => {
  // Always reseed for now
  await Service.deleteMany({});

  const services = [
    {
      id: "s1",
      name: "Blood Pressure Check",
      serviceType: "Cardiology",
      fees: 199,
      availableSlots: ["09:00", "10:00", "11:00", "14:00", "15:00"],
    },
    {
      id: "s2",
      name: "Thyroid Test",
      serviceType: "Endocrinology",
      fees: 299,
      availableSlots: ["09:30", "10:30", "11:30", "14:30", "15:30"],
    },
    {
      id: "s3",
      name: "X-Ray",
      serviceType: "Radiology",
      fees: 499,
      availableSlots: ["09:00", "10:00", "12:00", "13:00", "16:00"],
    },
    {
      id: "s4",
      name: "CT Scan",
      serviceType: "Radiology",
      fees: 899,
      availableSlots: ["10:00", "11:00", "14:00", "15:00", "16:00"],
    },
    {
      id: "s5",
      name: "Blood Sugar Test",
      serviceType: "Pathology",
      fees: 149,
      availableSlots: ["09:00", "10:30", "11:30", "13:30", "15:00"],
    },
    {
      id: "s6",
      name: "MRI",
      serviceType: "Radiology",
      fees: 1299,
      availableSlots: ["09:00", "11:00", "14:00", "16:00"],
    },
    {
      id: "s7",
      name: "Glucose Test",
      serviceType: "Pathology",
      fees: 129,
      availableSlots: ["09:30", "10:30", "12:30", "14:30", "15:30"],
    },
  ];

  await Service.insertMany(services);
  console.log("Seeded default services.");
};