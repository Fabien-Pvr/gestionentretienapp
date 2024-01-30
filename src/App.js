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

function App() {
  return (
    <div className="App">
      <header>
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
      </header>
      <div className="ContainerInit">
        {/* <MaterielList /> */}
        {/* <FormMateriel /> */}
        <Home />
        {/* <BesoinEntretien /> */}
        {/* <NoticeForm /> */}
        {/* <FormEntretien /> */}
        {/* <GetEntretien /> */}
      </div>
      <Footer />
    </div>
  );
}

export default App;
