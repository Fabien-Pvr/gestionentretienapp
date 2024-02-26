import React, { useState } from "react";
import { auth } from "../Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import "../CSS/Connexion.css";
import logo from "../image/LogoP2I.svg"; // Assurez-vous que le chemin d'accès est correct
import iconMail from "../image/icon-mail.png";
import iconLock from "../image/icon-Lock.png";

const Connexion = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (!userCredential.user.emailVerified) {
        console.log("Veuillez vérifier votre email");
        return;
      }
      console.log("Connecté :", userCredential.user);
    } catch (error) {
      console.error("Erreur lors de la connexion :", error.message);
    }
  };

  return (
    <div className="connexion-page">
      <div className="connexion-div-logo">
        <img src={logo} className="connexion-logo" alt="logo" />
      </div>
      <div className="connexion-div-input">
        <label className="connexion-label">
          <img src={iconMail} className="connexion-icon" alt="Icon" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="connexion-input"
          />
        </label>
        <label className="connexion-label">
          <img src={iconLock} className="connexion-icon" alt="Icon" />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe"
            className="connexion-input"
            required
          />
        </label>
      </div>
      <div className="connexion-position-buttons">
        <div className="connexion-button-co">
          <button className="button-co" onClick={signIn}>
            Se connecter
          </button>
        </div>
      </div>
    </div>
  );
};

export default Connexion;
