import React, { useState, useEffect } from "react";
import { auth } from "./Firebase";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./CSS/App.css";
import Deconnexion from "./Component_Utilisateurs/Deconnexion";
import Connexion from "./Component_Utilisateurs/Connexion";
import Inscription from "./Component_Utilisateurs/Inscription";

// Importez vos composants de page
import Home from "./Pages/Home";
import Ajout from "./Pages/Ajout";
import Historique from "./Pages/Historique";
import Parametres from "./Pages/Parametres";
// import Entretien from "./Pages/Entretien"; // Assurez-vous d'avoir un composant pour la page Entretien

import Footer from "./Component_App/Footer";
import Head from "./Component_App/Head";

function Application() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Head />
        </header>

        <main className="ContainerInit"></main>

        <Footer />

        <Routes>
          <Route path="/home/*" element={<Home />} />
          <Route path="/ajout/*" element={<Ajout />} />
          <Route path="/historique/*" element={<Historique />} />
          <Route path="/parametres/*" element={<Parametres />} />
        </Routes>
      </div>
    </Router>
  );
}

export default Application;
