import { FaEnvelope, FaIdCard, FaPhone, FaUserInjured, FaUserPlus } from "react-icons/fa";
import { Patient } from "../types";
import StatBox from "./StatBox";

type Props = {
  patients: Patient[];
};

export const DashboardStats = ({ patients }: Props) => {
  const total = patients.length;
  const gmailCount = patients.filter(p => p.email.includes("@gmail.com")).length;
  const uyPhones = patients.filter(p => p.phone.startsWith("+598")).length;
  const withCustomPhoto = patients.filter(p => !p.photoUrl.includes("randomuser")).length;

  const lastPatient = [...patients].sort((a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )[0];

  return (
    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "2rem" }}>
      <StatBox title="Total Patients" value={total} icon={<FaUserInjured size={28} />} />
      <StatBox title="Validated Emails" value={gmailCount} icon={<FaEnvelope size={28} />} />
      <StatBox title="Phones +598" value={uyPhones} icon={<FaPhone size={28} />} />
      <StatBox title="Validated Document Photos" value={withCustomPhoto} icon={<FaIdCard size={28} />} />
      {lastPatient && (
        <StatBox
          title="Last Registered"
          value={lastPatient.fullName}
          subtitle={new Date(lastPatient.createdAt).toLocaleDateString()}
          icon={<FaUserPlus size={28} />}
        />
      )}
    </div>
  );
};

