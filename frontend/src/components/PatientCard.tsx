import { useState } from "react";
import { Patient } from "../types";

type Props = {
  patient: Patient;
};

export const PatientCard = ({ patient }: Props) => {
    const [expanded, setExpanded] = useState(false);
  
    console.log(`Rendering: ${patient.fullName}, expanded: ${expanded}`);

    return (
      <div
        onClick={() => setExpanded(!expanded)}
        style={{
          borderRadius: "12px",
          padding: "2.5rem 1.0rem",
          backgroundColor: "#00879E",
          color: "#fff",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          cursor: "pointer",
          transition: "transform 0.2s ease",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          src={patient.photoUrl}
          alt="Document"
          style={{
            width: "100px",
            height: "100px",
            objectFit: "cover",
            borderRadius: "50%",
            marginBottom: "1rem",
          }}
        />
        <h3 style={{ margin: 0, marginBottom: "0.5rem" }}>{patient.fullName}</h3>
  
        {expanded && (
        <div style={{ marginTop: "1rem", textAlign: "center" }}>
            <p><strong>Email:</strong> {patient.email}</p>
            <p><strong>Phone:</strong> {patient.phone}</p>
        </div>
        )}
      </div>

    );
  };