import React from "react";

import Deconnexion from "../Component/Component_Utilisateurs/Deconnexion";
import BarreTitreParametre from "../Component/Component_Parametre/BarreTitreParametre";

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
