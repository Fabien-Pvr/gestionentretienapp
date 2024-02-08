import React from "react";
import { BrowserRouter as Router } from "react-router-dom"; // Import de BrowserRouter
import logo from "./image/LogoP2I.svg";
import "./CSS/App.css";
import Home from "./Pages/Home"; // Home contiendra les Routes
import Footer from "./Component_App/Footer";
import Head from "./Component_App/Head";
import useGetMaterielData from "./Component_Home/UseGetMaterielData";
import NoticeForm from "./Component_Ajout/FormNotice";
import Ajout from "./Pages/Ajout";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Head />
        </header>

        <main className="ContainerInit">
          {/* <Home /> */}
          {/* <NoticeForm /> */}
          <Ajout />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
