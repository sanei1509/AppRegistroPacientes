import './EmptyState.css';
import { FaRegSadTear } from "react-icons/fa";

export const EmptyState = () => {
    return (
      <div className="empty-state">
        <FaRegSadTear className="empty-state__icon" />
        <p>No patients found.</p>
      </div>
    );
  };