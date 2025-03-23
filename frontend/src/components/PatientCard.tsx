import { useState } from "react";
import { Patient } from "../types";

type Props = {
  patient: Patient;
};

export const PatientCard = ({ patient }: Props) => {
  const [expanded, setExpanded] = useState(false);

  // Detectamos si la URL ya es absoluta, y si no, la completamos con la base del backend
  const baseURL = "http://localhost:5000"; // e.g. http://localhost:5000
  const imageUrl = patient.photoUrl.startsWith("http")
    ? patient.photoUrl
    : `${baseURL}${patient.photoUrl}`; // ej: http://localhost:5000/uploads/imagen.jpg

    console.log("Image URL:", imageUrl)
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
        src={imageUrl}
        alt="Document"
        style={{
          maxWidth: "150px",
          height: "100px",
          objectFit: "cover",
          borderRadius: "4px",
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
