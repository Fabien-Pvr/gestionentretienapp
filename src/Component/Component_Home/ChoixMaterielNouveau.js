import React from "react";
import { Link } from "react-router-dom";
import "../../CSS/ChoixMaterielNouveau.css";
import { useState } from "react";

const ChoixMaterielNouveau = () => {
  const [activePage, setActivePage] = useState("materiel"); 

  const handleClick = (page) => {
    setActivePage(page);
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
      {/* <Link
        to="/home/nouveau"
        className={activePage === "nouveau" ? "nomActive" : "nomUnactive"}
        onClick={() => handleClick("nouveau")}
      >
        Nouveau
      </Link> */}
    </div>
  );
};

export default ChoixMaterielNouveau;
