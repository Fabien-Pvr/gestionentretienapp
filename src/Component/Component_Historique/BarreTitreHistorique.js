import React from "react";
import { Link } from "react-router-dom";
import "../../CSS/ChoixMaterielNouveau.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BarreTitreHistorique = () => {
  const [activePage, setActivePage] = useState("historique");
  const navigate = useNavigate();

  const handleClick = (page) => {
    setActivePage(page);
  };

  const HandleClickAjout = (activeBox) => {
    navigate(`/ajout/${activeBox}`, { state: { activeBox } });
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
      <p onClick={() => HandleClickAjout("entretien")} className="nomUnactive">
        Ajouter +
      </p>
    </div>
  );
};

export default BarreTitreHistorique;
