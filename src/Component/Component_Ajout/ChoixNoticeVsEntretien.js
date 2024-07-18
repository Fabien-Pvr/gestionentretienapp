import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../../CSS/ChoixMaterielNouveau.css";

const ChoixMaterielNouveau = () => {
  const location = useLocation();
  const initialActivePage = location.state?.activeBox || "materiel";
  const [activePage, setActivePage] = useState(initialActivePage);

  useEffect(() => {
    setActivePage(initialActivePage);
  }, [initialActivePage]);

  const handleClick = (page) => {
    setActivePage(page);
  };

  return (
    <div className="barreChoix">
      <Link
        to="/ajout/materiel"
        className={activePage === "materiel" ? "nomActive" : "nomUnactive"}
        onClick={() => handleClick("materiel")}
      >
        Materiel
      </Link>
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
    </div>
  );
};

export default ChoixMaterielNouveau;
