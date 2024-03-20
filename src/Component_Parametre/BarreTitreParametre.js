import React from "react";
import { Link } from "react-router-dom";
import "../CSS/ChoixMaterielNouveau.css";

const BarreTitreParametre = () => {
  return (
    <div className="barreChoix">
      <Link to="/parametres/parametres" className="nomActive">
        Parametres
      </Link>
    </div>
  );
};

export default BarreTitreParametre;
