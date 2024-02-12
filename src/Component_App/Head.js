import React from "react";
import { Link } from "react-router-dom";
import "../CSS/App.css";
import logo from "../image/LogoP2I.svg"; // Assurez-vous que le chemin d'accès est correct

const Head = () => {
  return (
    <div>
      <Link to="/home/materiel">
        <img src={logo} className="App-logo" alt="logo" />
      </Link>
    </div>
  );
};

export default Head;
