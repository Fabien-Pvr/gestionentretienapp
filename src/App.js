import React from "react";
import { BrowserRouter as Route, Routes } from "react-router-dom";
import "./CSS/App.css";

// Importez vos composants de page
import Home from "./Pages/Home";
import Ajout from "./Pages/Ajout";
import Historique from "./Pages/Historique";
import Parametres from "./Pages/Parametres";

import Footer from "./Component_App/Footer";
import Head from "./Component_App/Head";

function App() {
  return (
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
      </Routes>
    </div>
  );
}

export default App;
