import React from "react";
import { Routes, Route } from "react-router-dom";

import BarreTitreHistorique from "../Component/Component_Historique/BarreTitreHistorique";

import GetEntretien from "../Component/Component_Historique/Entretien";

const Historique = () => {
  return (
    <div>
      <div className="positoinBarreChoix">
        <BarreTitreHistorique />
      </div>
      <div className="positoinForm_Enregistrement">
        <Routes>
          <Route path="/historique" element={<GetEntretien />} />
        </Routes>
      </div>
    </div>
  );
};

export default Historique;
