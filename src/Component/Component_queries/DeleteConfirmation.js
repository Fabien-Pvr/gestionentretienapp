import React, { useState } from "react";
import deleteElement from "./ElementDelete";
import ConfirmationPopUp from "./ConfirmationPopUp";

const DeleteConfirmation = ({ table, id, setError }) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleDelete = () => {
    deleteElement(table, id, setError);
    console.log("Supprimer l'élément ici");
  };

  return (
    <div>
      {/* <button onClick={() => setIsPopupVisible(true)}>
        Supprimer l'élément
      </button> */}
      <ConfirmationPopUp
        message="Êtes-vous sûr de vouloir supprimer cet élément ?"
        buttonMessage="Supprimer"
        onConfirm={() => {
          handleDelete();
          setIsPopupVisible(false);
        }}
        onCancel={() => setIsPopupVisible(false)}
        show={isPopupVisible}
      />
    </div>
  );
};

export default DeleteConfirmation;
