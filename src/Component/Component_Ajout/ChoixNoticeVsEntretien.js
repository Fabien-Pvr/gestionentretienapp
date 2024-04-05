import React from "react";
import { Link } from "react-router-dom";
import "../../CSS/ChoixMaterielNouveau.css";
import { useState } from "react";

const ChoixMaterielNouveau = () => {
  const [activePage, setActivePage] = useState("notice");

  const handleClick = (page) => {
    setActivePage(page);
  };

  return (
    <div className="barreChoix">
      <Link
        to="/ajout/notice"
        className={activePage === "notice" ? "nomActive" : "nomUnactive"}
        onClick={() => handleClick("notice")}
      >
        Notice
      </Link>
      <Link
        to="/ajout/entretien"
        className={activePage === "entretien" ? "nomActive" : "nomUnactive"}
        onClick={() => handleClick("entretien")}
      >
        Entretien
      </Link>
      <Link
        to="/ajout/materiel"
        className={activePage === "materiel" ? "nomActive" : "nomUnactive"}
        onClick={() => handleClick("materiel")}
      >
        Materiel
      </Link>
    </div>
  );
};

export default ChoixMaterielNouveau;
