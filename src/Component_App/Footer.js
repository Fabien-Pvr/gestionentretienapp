import React from "react";
import logo1 from "../image/GroupIconTracteur.svg";
import logo2 from "../image/VectoriconAjout.svg";
import logo3 from "../image/VectoriconHistorique.svg";
import logo4 from "../image/VectoriconSetting.svg";
import "../CSS/Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-frame-active">
        <div className="frameIcons">
          <img src={logo1} className="icons" alt="iconsAccueil" />
        </div>
        <div className="navbar-text-active">Matériel</div>
      </div>

      <div className="navbar-frame">
        <div className="frameIcons">
          <img src={logo2} className="icons" alt="iconsAjout" />
        </div>
        <div className="navbar-text">Ajout</div>
      </div>

      <div className="navbar-frame">
        <div className="frameIcons">
          <img src={logo3} className="icons" alt="iconsHistorique" />
        </div>
        <div className="navbar-text">Historique</div>
      </div>

      <div className="navbar-frame">
        <div className="frameIcons">
          <img src={logo4} className="icons" alt="iconsSetting" />
        </div>
        <div className="navbar-text">Paramètres</div>
      </div>
    </div>
  );
};

export default Navbar;
