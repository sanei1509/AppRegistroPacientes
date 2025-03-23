import { Patient } from "../types";
import { PatientCard } from "./PatientCard";

type Props = {
  patients: Patient[];
};

export const PatientList = ({ patients }: Props) => {
  if (patients.length === 0) {
    return <p>No patients found.</p>;
  }

  console.log("Patients received:", patients);

  return (
    <div style={styles.container}>
      {patients.map((p) => (
        <PatientCard key={p.id} patient={p} />
      ))}
    </div>
  );
};

const styles = {
    container: {
      paddingTop: "40px",
      display: "grid",
      gap: "1rem",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      alignItems: "start", 
    },
  };