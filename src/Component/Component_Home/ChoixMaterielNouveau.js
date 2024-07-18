import React from "react";
import { Link } from "react-router-dom";
import "../../CSS/ChoixMaterielNouveau.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ChoixMaterielNouveau = () => {
  const [activePage, setActivePage] = useState("materiel");
  const navigate = useNavigate();

  const handleClick = (page) => {
    setActivePage(page);
  };
  const HandleClickAjout = (activePage) => {
    navigate(`/ajout/${activePage}`, { state: { activePage } });
  };

  return (
    <div className="barreChoix">
      <Link
        to="/home/materiel"
        className={activePage === "materiel" ? "nomActive" : "nomUnactive"}
        onClick={() => handleClick("materiel")}
      >
        Matériel
      </Link>
      <p onClick={() => HandleClickAjout(activePage)} className="nomUnactive">
        Ajouter +
      </p>
    </div>
  );
};

export default ChoixMaterielNouveau;
