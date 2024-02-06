import React from "react";
import { BrowserRouter as Router } from "react-router-dom"; // Import de BrowserRouter
import logo from "./image/LogoP2I.svg";
import "./CSS/App.css";
import Home from "./Home"; // Home contiendra les Routes
import Footer from "./Footer";
import Head from "./Head";
import MaterielInfo from "./MaterielInfo";

import NoticeForm from "./FormNotice";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Head />
        </header>

        <main className="ContainerInit">
          <Home />
          {/* <MaterielInfo matId={"-NpRp-NRXX13w_HTg6KA"} /> */}
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
