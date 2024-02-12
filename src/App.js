import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./CSS/App.css";

// Importez vos composants de page
import Home from "./Pages/Home";
import Ajout from "./Pages/Ajout";
import Historique from "./Pages/Historique";
import Parametres from "./Pages/Parametres";
// import Entretien from "./Pages/Entretien"; // Assurez-vous d'avoir un composant pour la page Entretien

import Footer from "./Component_App/Footer";
import Head from "./Component_App/Head";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Head />{" "}
          {/* Le composant Head est maintenant présent sur toutes les pages */}
        </header>

        <main className="ContainerInit"></main>

        <Footer />

        <Routes>
          <Route path="/home/*" element={<Home />} />
          <Route path="/ajout/*" element={<Ajout />} />
          <Route path="/historique/*" element={<Historique />} />
          <Route path="/parametres/*" element={<Parametres />} />
          <Route path="*" element={<Navigate replace to="/home/materiel" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
