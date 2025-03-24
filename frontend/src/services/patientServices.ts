import { Patient } from "../types";

export const fetchPatients = async (): Promise<Patient[]> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/patients`);
  const data = await response.json();
  return Array.isArray(data) ? data : [];
};