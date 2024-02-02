import logo from "./image/LogoP2I.svg";
import "./CSS/App.css";
import React from "react";
import MaterielList from "./MaterielList";
import Footer from "./Footer";
import FormMateriel from "./FormMateriel";
import Home from "./Home";
import BesoinEntretien from "./BesoinEntretien";
import NoticeForm from "./FormNotice";
import FormEntretien from "./FormEntretien";
import GetEntretien from "./Entretien";
import ImageBackgroundComponent from "./ImageBackgroundComponent";
import Head from "./Head";
import ChoixMaterielNouveau from "./ChoixMaterielNouveau";

function App() {
  return (
    <div className="App">
      <header>
        <Head />
      </header>
      <ChoixMaterielNouveau />
      <div className="ContainerInit">
        <MaterielList />
        {/* <FormMateriel /> */}
      </div>
      <Footer />
    </div>
  );
}

export default App;
