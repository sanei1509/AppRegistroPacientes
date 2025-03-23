export const EmptyState = () => {
    return (
      <div style={{ textAlign: 'center', marginTop: '3rem', color: '#666' }}>
        <img
          src="https://img.icons8.com/ios/100/medical-folder.png"
          alt="No patients"
          style={{ width: "100px", marginBottom: "1rem", opacity: 0.6 }}
        />
        <p>No patients found.</p>
      </div>
    );
  };