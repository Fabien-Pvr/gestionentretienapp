import React from "react";
import { Link } from "react-router-dom";
import "./CSS/ChoixMaterielNouveau.css";
import { useState } from "react";

const ChoixMaterielNouveau = () => {
  const [activePage, setActivePage] = useState("notice"); // Par défaut, "Matériel" est la page active

  const handleClick = (page) => {
    setActivePage(page);
  };

  return (
    <div className="barreChoix">
      <Link
        to="/notice"
        className={activePage === "notice" ? "nomActive" : "nomUnactive"}
        onClick={() => handleClick("notice")}
      >
        Notice
      </Link>
      <Link
        to="/entretien"
        className={activePage === "entretien" ? "nomActive" : "nomUnactive"}
        onClick={() => handleClick("entretien")}
      >
        Entretien
      </Link>
    </div>
  );
};

export default ChoixMaterielNouveau;
