import React from "react";
import Popup from "../Component_Notice/Popup";

const ConfirmationPopUp = ({
  message,
  onConfirm,
  onCancel,
  show,
  buttonMessage,
}) => {
  return (
    <Popup show={show} onClose={onCancel}>
      <p className="Menu_Titre">{message}</p>
      <div className="Menu_PositionButton">
        <ul className="Menu_Containerbutton">
          <button className="Menu_button" onClick={onCancel}>
            Annuler
          </button>
        </ul>
        <ul className="Menu_Containerbutton">
          <button className="Menu_button_Supp" onClick={onConfirm}>
            {buttonMessage}
          </button>
        </ul>
      </div>
    </Popup>
  );
};

export default ConfirmationPopUp;
