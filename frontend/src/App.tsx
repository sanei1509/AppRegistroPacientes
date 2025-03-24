import { useEffect, useState } from 'react';
import { Patient } from './types';
import "./App.css";
import { PatientList } from './components/PatientList';
import { EmptyState } from './components/EmptyState';
import { Loader } from './components/Loader';
import Modal from './components/Modal';
import { PatientForm } from './components/PatientForm';
import { Toast } from './components/Toast';
import { DashboardStats } from './components/DashboardStats';
import { FaNotesMedical, FaPlus } from "react-icons/fa";
import { fetchPatients } from './services/patientServices';

function App() {
  const [patients, setPatients] = useState<Patient[]>();;
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    const loadPatients = async () => {
      try {
        const data = await fetchPatients();
        setPatients(data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      } finally {
        setLoading(false);
      }
    };
  
    loadPatients();
  }, []);


  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handlePatientAdded = async () => {
    setShowModal(false);
    await fetchPatients();
  };
  
  return (
    <div>
      <h1 className="app-title">
        <FaNotesMedical className="app-title-icon" /> Patient Management
      </h1>
      <p>Easily manage your patient records now!</p>
      
      <button className="add-button" onClick={() => setShowModal(true)}>
        <FaPlus /> Add Patient
      </button>
      
      {patients && <DashboardStats patients={patients} />}

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h2 style={{ marginBottom: '1rem' }}>Register New Patient</h2>
          
          <PatientForm
              onSuccess={() => {
                handlePatientAdded();
                showToast("Patient successfully registered ", "success");
              }}
              onError={(msg) => showToast(msg, "error")}
          />
        
        </Modal>
      )}

      {toast && <Toast message={toast.message} type={toast.type} />}

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
