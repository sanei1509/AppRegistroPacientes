import { useEffect, useState } from 'react';
import { Patient } from './types';
import "./App.css";
import { PatientList } from './components/PatientList';
import { EmptyState } from './components/EmptyState';
import { Loader } from './components/Loader';
import Modal from './components/Modal';
import { PatientForm } from './components/PatientForm';

function App() {
  const [patients, setPatients] = useState<Patient[]>();;
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/patients`, {
          method: 'GET'
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setPatients(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching patients:", error);
      } finally {
        setLoading(false);
        console.log(loading);
      }
    };

    fetchPatients();
  }, []);

  console.log("Pacientes", patients);
  return (
    <div>
      <h1>Registro de pacientes</h1>
      <button
        onClick={() => setShowModal(true)}
        style={{
          backgroundColor: "#00879E",
          color: "#fff",
          padding: "0.75rem 1.5rem",
          border: "none",
          borderRadius: "8px",
          fontSize: "1rem",
          fontWeight: "bold",
          cursor: "pointer",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          transition: "background-color 0.3s, transform 0.2s",
          marginBottom: "1.5rem"
        }}
      >
        Add Patient
      </button>


      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h2 style={{ marginBottom: '1rem' }}>Register New Patient</h2>
          <PatientForm />
        </Modal>
      )}


      {loading ? (
        <Loader />
      ) : patients?.length === 0 ? (
        <EmptyState />
      ) : (
        <PatientList patients={patients!} />
      )}
    </div>
  );
}

export default App;
