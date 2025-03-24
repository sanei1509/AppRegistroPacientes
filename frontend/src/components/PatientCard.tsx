import { useState } from "react";
import { Patient } from "../types";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import "./PatientCard.css";

type Props = {
  patient: Patient;
};

export const PatientCard = ({ patient }: Props) => {
  const [expanded, setExpanded] = useState(false);

  const baseURL = "http://localhost:5000";
  const imageUrl = patient.photoUrl.startsWith("http")
    ? patient.photoUrl
    : `${baseURL}${patient.photoUrl}`;

  return (
    <div className="patient-card" onClick={() => setExpanded(!expanded)}>
      <img src={imageUrl} alt="Document" className="patient-card__image" />

      <h3 className="patient-card__name">{patient.fullName}</h3>

      <div className="patient-card__icon">
        {expanded ? <FaChevronUp /> : <FaChevronDown />}
      </div>

      <div className={`patient-card__details ${expanded ? "patient-card__details--expanded" : ""}`}>
        <p className="patient-card__detail-item">
          <strong>Email:</strong> {patient.email}
        </p>
        <p className="patient-card__detail-item">
          <strong>Phone:</strong> {patient.phone}
        </p>
      </div>
    </div>
  );
};
