import React from "react";
import { Routes, Route } from "react-router-dom";
// import ChoixNoticeVsEntretien from "../Component_Ajout/ChoixNoticeVsEntretien";
// import NoticeForm from "../Component_Ajout/FormNotice";
// import FormEntretien from "../Component_Ajout/FormEntretien";

// import "../CSS/Historique.css";
import BarreTitreHistorique from "../Component_Historique/BarreTitreHistorique";

import GetEntretien from "../Component_Historique/Entretien";

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
