import React, { useState, useEffect } from "react";
import { auth } from "./Firebase";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./CSS/App.css";
import Deconnexion from "./Component_Utilisateurs/Deconnexion";
import Connexion from "./Component_Utilisateurs/Connexion";
import Inscription from "./Component_Utilisateurs/Inscription";
import Application from "./AppAfterLogin";

// Importez vos composants de page
import Home from "./Pages/Home";
import Ajout from "./Pages/Ajout";
import Historique from "./Pages/Historique";
import Parametres from "./Pages/Parametres";
// import Entretien from "./Pages/Entretien"; // Assurez-vous d'avoir un composant pour la page Entretien

import Footer from "./Component_App/Footer";
import Head from "./Component_App/Head";
import { AuthProvider } from "./Component_Utilisateurs/AuthContext";
import VerifLogin from "./VerifLogin";

function App() {
  return (
    <AuthProvider>
      <VerifLogin />
    </AuthProvider>
  );
}

export default App;
