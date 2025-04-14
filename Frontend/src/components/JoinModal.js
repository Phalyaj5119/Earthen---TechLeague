import React from 'react';
import './JoinModal.css';

const JoinModal = () => {
  return (
    <div id="joinModal" className="modal">
      <div className="modal-content">
        <span className="close" onClick={() => document.getElementById('joinModal').style.display = 'none'}>&times;</span>
        <h2>Login or Sign Up</h2>
        <p>[Login/Signup form placeholder]</p>
      </div>
    </div>
  );
};

export default JoinModal;
