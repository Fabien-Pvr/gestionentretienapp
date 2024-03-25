import React from "react";
import "../../CSS/Popup.css"; // Un fichier CSS pour le style du pop-up

const Popup = ({ show, onClose, children }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="popup-backdrop">
      <div className="popup-content">
        <button className="popup-close" onClick={onClose}>
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default Popup;
