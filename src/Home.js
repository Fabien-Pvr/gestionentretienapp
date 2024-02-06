import React from "react";
import { Routes, Route } from "react-router-dom";
import MaterielList from "./MaterielList";
import TracteurFormIm from "./FormMateriel";
import ChoixMaterielNouveau from "./ChoixMaterielNouveau";
import "./CSS/Home.css";
// Autres imports si nécessaire

const Home = () => {
  return (
    <div >
      <div>
        <ChoixMaterielNouveau /> 
      </div>
      <div className="test1">
        <Routes>
          <Route path="/materiel" element={<MaterielList />} />
          <Route path="/nouveau" element={<TracteurFormIm />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
