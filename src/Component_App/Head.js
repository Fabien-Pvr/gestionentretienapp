import React from "react";
import "../CSS/App.css";
import logo from "../image/LogoP2I.svg"; // Assurez-vous que le chemin d'accès est correct

const Head = () => {
  return (
    <div>
        <img src={logo} className="App-logo" alt="logo" />
    </div>
  );
};

export default Head;
