import { Patient } from "../types";
import { PatientCard } from "./PatientCard";
import "./PatientList.css";

type Props = {
  patients: Patient[];
};

export const PatientList = ({ patients }: Props) => {
  if (patients.length === 0) {
    return <p>No patients found.</p>;
  }

  return (
    <div className="patient-list__container">
      {patients.map((p) => (
        <PatientCard key={p.id} patient={p} />
      ))}
    </div>
  );
};