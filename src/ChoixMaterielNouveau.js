import React from "react";
import { Link } from "react-router-dom";
import "./CSS/ChoixMaterielNouveau.css";

const ChoixMaterielNouveau = () => {
  return (
    <div className="barreChoix">
      <Link to="/materiel" className="nomActive">
        Matériel
      </Link>
      <Link to="/nouveau" className="nomUnactive">
        Nouveau
      </Link>
    </div>
  );
};

export default ChoixMaterielNouveau;
