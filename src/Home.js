import React from "react";
import { Routes, Route } from "react-router-dom";
import MaterielList from "./MaterielList";
import TracteurFormIm from "./FormMateriel";
import ChoixMaterielNouveau from "./ChoixMaterielNouveau";
import VehicleDetails from "./VehicleDetails";
import "./CSS/Home.css";
// Autres imports si nécessaire

const Home = () => {
  return (
    <div>
      <div className="positoinBarreChoix">
        <ChoixMaterielNouveau />
      </div>
      <div className="positoinMaterielList">
        <Routes>
          <Route path="/materiel" element={<MaterielList />} />
          <Route path="/nouveau" element={<TracteurFormIm />} />
          <Route path="/vehicule/:vehicleId" element={<VehicleDetails />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
