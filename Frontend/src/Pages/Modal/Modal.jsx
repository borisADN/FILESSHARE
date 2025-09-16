import React from 'react';
import './Modal.css'; // Assure-toi de créer ce fichier CSS pour styliser le modal

const Modal = ({ isOpen, onClose, user }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <img 
          src={user.avatar} 
          alt={user.name} 
          style={{ width: '100px', height: '100px', borderRadius: '50%' }} 
        />
        <h2>{user.name}</h2>
        <p> {user.email}</p>
        <button style={{ backgroundColor: 'red', color: 'white',marginRight: '10px' }}>Deconnexion</button>
        <button onClick={onClose}>Fermer</button>
      </div>
    </div>
  );
};

export default Modal;
