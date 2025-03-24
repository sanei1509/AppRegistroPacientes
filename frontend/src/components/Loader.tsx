import './Loader.css';

export const Loader = () => {
  return (
    <div className="loader-container">
      <div className="spinner" />
      <p>Loading patients...</p>
    </div>
  );
};