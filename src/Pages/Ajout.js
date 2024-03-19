import React from "react";
import { Routes, Route } from "react-router-dom";
import ChoixNoticeVsEntretien from "../Component_Ajout/ChoixNoticeVsEntretien";
import NoticeForm from "../Component_Ajout/FormNotice";
import FormEntretien from "../Component_Ajout/FormEntretien";
import TracteurFormIm from "../Component_Home/FormMateriel";

import "../CSS/Home.css";

const Ajout = () => {
  return (
    <div>
      <div className="positoinBarreChoix">
        <ChoixNoticeVsEntretien />
      </div>
      <div className="positoinForm_Enregistrement">
        <Routes>
          <Route path="/notice" element={<NoticeForm />} />
          <Route path="/entretien" element={<FormEntretien />} />
          <Route path="/materiel" element={<TracteurFormIm />} />
        </Routes>
      </div>
    </div>
  );
};

export default Ajout;
