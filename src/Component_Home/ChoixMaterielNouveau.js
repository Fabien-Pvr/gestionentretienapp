import React from "react";
import { Link } from "react-router-dom";
import "../CSS/ChoixMaterielNouveau.css";
import { useState } from "react";

const ChoixMaterielNouveau = () => {
  const [activePage, setActivePage] = useState("materiel"); // Par défaut, "Matériel" est la page active

  const handleClick = (page) => {
    setActivePage(page);
  };

  return (
    <div className="barreChoix">
      <Link
        to="/materiel"
        className={activePage === "materiel" ? "nomActive" : "nomUnactive"}
        onClick={() => handleClick("materiel")}
      >
        Matériel
      </Link>
      <Link
        to="/nouveau"
        className={activePage === "nouveau" ? "nomActive" : "nomUnactive"}
        onClick={() => handleClick("nouveau")}
      >
        Nouveau
      </Link>
    </div>
  );
};

export default ChoixMaterielNouveau;
