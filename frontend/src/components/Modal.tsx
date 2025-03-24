import React, { useRef, useState } from 'react';
import './Modal.css';

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  const handleClickOutside = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      handleClose();
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 200);
  };

  return (
    <div style={styles.overlay} onClick={handleClickOutside}>
      <div
        ref={modalRef}
        style={styles.modal}
        className={
          isVisible
            ? 'modal-enter modal-enter-active'
            : 'modal-exit modal-exit-active'
        }
      >
        <button style={styles.closeButton} onClick={handleClose}>✖</button>
        {children}
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed' as const,
    top: 0, left: 0, width: '100vw', height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    zIndex: 1000
  },
  modal: {
    overflowY: 'auto',
    background: '#fff',
    borderRadius: '10px',
    padding: '2rem',
    minWidth: '400px',
    maxHeight: '80vh',
    position: 'relative',
    boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
  } as const,
  closeButton: {
    position: 'absolute' as const,
    top: '10px',
    right: '10px',
    background: 'none',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer'
  }
};

export default Modal;