import React from "react";
import { Link } from "react-router-dom";
import "../CSS/ChoixMaterielNouveau.css";
import { useState } from "react";

const BarreTitreHistorique = () => {
  const [activePage, setActivePage] = useState("historique"); // Par défaut, "Matériel" est la page active

  const handleClick = (page) => {
    setActivePage(page);
  };

  return (
    <div className="barreChoix">
      <Link
        to="/historique/historique"
        className={activePage === "historique" ? "nomActive" : "nomUnactive"}
        onClick={() => handleClick("historique")}
      >
        Historique
      </Link>
    </div>
  );
};

export default BarreTitreHistorique;
