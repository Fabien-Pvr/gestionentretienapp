import React from "react";

import Deconnexion from "../Component_Utilisateurs/Deconnexion";
import BarreTitreParametre from "../Component_Parametre/BarreTitreParametre";

const Parametres = () => {
  return (
    <div>
      <div className="positoinBarreChoix">
        <BarreTitreParametre />
      </div>
      <div>
        <Deconnexion />
      </div>
    </div>
  );
};

export default Parametres;
