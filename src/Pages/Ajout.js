import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import ChoixNoticeVsEntretien from "../Component/Component_Ajout/ChoixNoticeVsEntretien";
import NoticeForm from "../Component/Component_Ajout/FormNotice";
import FormEntretien from "../Component/Component_Ajout/FormEntretien";
import TracteurFormIm from "../Component/Component_Home/FormMateriel";

const Ajout = () => {
  const { pathname } = useLocation();

  return (
    <div>
      <div className="positoinBarreChoix">
        <ChoixNoticeVsEntretien />
      </div>
      <div className="positoinForm_Enregistrement">
        <Routes location={pathname}>
          <Route path="notice" element={<NoticeForm />} />
          <Route path="entretien" element={<FormEntretien />} />
          <Route path="materiel" element={<TracteurFormIm />} />
        </Routes>
      </div>
    </div>
  );
};

export default Ajout;
