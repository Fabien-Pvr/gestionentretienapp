import React from "react";
import { Routes, Route } from "react-router-dom";
import ChoixNoticeVsEntretien from "./ChoixNoticeVsEntretien";
import NoticeForm from "./FormNotice";
import FormEntretien from "./FormEntretien";

import "./CSS/Home.css";

const Ajout = () => {
  return (
    <div>
      <div className="positoinBarreChoix">
        <ChoixNoticeVsEntretien />
      </div>
      <div className="positoinMaterielList">
        <Routes>
          <Route path="/notice" element={<NoticeForm />} />
          <Route path="/entretien" element={<FormEntretien />} />
        </Routes>
      </div>
    </div>
  );
};

export default Ajout;
