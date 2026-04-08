const BASE_URL = "http://localhost:5000/api";

const handleResponse = async (res: Response) => {
  const text = await res.text();
  const data = text ? JSON.parse(text) : {};
  if (!res.ok) {
    throw new Error(data.msg || data.message || `HTTP ${res.status}`);
  }
  return data;
};

export const getDoctors = async () => {
  const res = await fetch(`${BASE_URL}/doctors`);
  return handleResponse(res);
};

export const getServices = async () => {
  const res = await fetch(`${BASE_URL}/services`);
  return handleResponse(res);
};

export const getAppointments = async () => {
  const res = await fetch(`${BASE_URL}/appointments`);
  return handleResponse(res);
};

export const getPatientAppointments = async (id: string) => {
  const res = await fetch(`${BASE_URL}/appointments/${id}`);
  return handleResponse(res);
};

export const createAppointment = async (data: any) => {
  const res = await fetch(`${BASE_URL}/appointments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
};

export const registerUser = async (data: any) => {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
};

export const loginUser = async (data: any) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
};

export const updateAppointmentStatus = async (id: string, data: any) => {
  const res = await fetch(`${BASE_URL}/appointments/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
};