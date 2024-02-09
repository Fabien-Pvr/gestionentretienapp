import React from "react";
import { Routes, Route } from "react-router-dom";
import MaterielList from "../Component_Home/MaterielList";
import TracteurFormIm from "../Component_Home/FormMateriel";
import ChoixMaterielNouveau from "../Component_Home/ChoixMaterielNouveau";
import VehicleDetails from "../Component_Home/VehicleDetails";
import "../CSS/Home.css";


const Home = () => {
  return (
    <div>
      <div className="positoinBarreChoix">
        <ChoixMaterielNouveau />
      </div>
      <div className="positoinMaterielList">
        <Routes>
          <Route path="materiel" element={<MaterielList />} />
          <Route path="nouveau" element={<TracteurFormIm />} />
          <Route path="vehicule/:vehicleId" element={<VehicleDetails />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
