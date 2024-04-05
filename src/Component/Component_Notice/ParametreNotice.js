import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import deleteElement from "../Component_queries/ElementDelete";
import ElementModif from "../Component_queries/ElementModifNotice";
import Popup from "./Popup";

const MenuOverlay = ({ table, id, fields }) => {
  const [showEdit, setShowEdit] = useState(false);
  const [error, setError] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false); 
  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };
  console.log(error);
  const handleDeleteElement = () => {
    deleteElement(table, id, setError);
    setIsPopupOpen(false);
  };

  const handleModifElement = () => {
    setShowEdit(true);
    setIsPopupOpen(false); 
  };

  return (
    <div>
      <MoreVertIcon onClick={togglePopup} />
      <Popup show={isPopupOpen} onClose={togglePopup}>
        <p className="Menu_Titre">Menu de la notice</p>
        <div className="Menu_PositionButton">
          <ul className="Menu_Containerbutton">
            <button className="Menu_button" onClick={handleModifElement}>
              Modifier
            </button>
          </ul>
          <ul className="Menu_Containerbutton">
            <button className="Menu_button_Supp" onClick={handleDeleteElement}>
              Supprimer
            </button>
          </ul>
        </div>
      </Popup>
      {showEdit && (
        <ElementModif
          idNotice={id}
          notice={fields[0]}
          isFullscreen={showEdit}
        />
      )}
    </div>
  );
};

export default MenuOverlay;
