import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import deleteElement from "../Component_queries/ElementDelete";
import ElementModif from "../Component_queries/ElementModif";
import { useNavigate } from "react-router-dom";

const MenuOverlay = ({ table, id, fields }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [error, setError] = useState("");
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleDeleteElement = () => {
    deleteElement(table, id, setError);
  };

  const handleModifElement = () => {
    setShowEdit(true);
    setIsMenuOpen(false); // Ferme le menu lorsqu'on clique sur Modifier
  };

  return (
    <div>
      <MoreVertIcon onClick={toggleMenu} />
      {isMenuOpen && (
        <div className="menu-overlay">
          <ul>
            <button onClick={handleDeleteElement}>Supprimer</button>
          </ul>
          <ul>
            <button onClick={handleModifElement}>Modifier</button>
          </ul>
        </div>
      )}
      {showEdit && <ElementModif idNotice={id} notice={fields[0]} isFullscreen={showEdit} />} 
    </div>
  );
};

export default MenuOverlay;

