import React from "react";
import { Link } from "react-router-dom";
import "../CSS/ChoixMaterielNouveau.css";
import { useState } from "react";

const BarreTitreParametre = () => {
  const [activePage, setActivePage] = useState("parametres"); // Par défaut, "Matériel" est la page active

  const handleClick = (page) => {
    setActivePage(page);
  };

  return (
    <div className="barreChoix">
      <Link
        to="/parametres/parametres"
        className="nomActive"
        onClick={() => handleClick("historique")}
      >
        Parametres
      </Link>
    </div>
  );
};

export default BarreTitreParametre;
