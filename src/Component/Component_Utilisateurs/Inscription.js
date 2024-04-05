import React, { useState } from "react";
import { auth, db } from "../../Services/Firebase";
import { useNavigate } from "react-router-dom"; 
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { ref, set } from "firebase/database";

import logo from "../../image/LogoP2I.svg";
import iconprofil from "../../image/icon-profil.png";
import iconLock from "../../image/icon-Lock.png";
import iconMail from "../../image/icon-mail.png";
import "../../CSS/Inscription.css";

const Inscription = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");


  const navigate = useNavigate();
  const signUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user) {
        await updateProfile(userCredential.user, { displayName });
        await sendEmailVerification(userCredential.user)
          .then(() => {
            console.log("Email de vérification envoyé");
          })
          .catch((error) => {
            console.error(
              "Erreur lors de l'envoi de l'email de vérification :",
              error
            );
          });

        await set(ref(db, `Users/${userCredential.user.uid}`), {
          IdUser: userCredential.user.uid,
          NomUser: displayName,
          StatutUser: "Salarié",
        });
        

        navigate("/exploitation");
      }
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error.message);
      setError(error.message);
    }
  };

  const HandleClickCo = () => {
    navigate("/connexion");
  };
  return (
    <div className="inscription-page">
      <div className="inscription-div-logo">
        <img src={logo} className="inscription-logo" alt="logo" />
      </div>
      <form className="form-Inscription" onSubmit={signUp}>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div className="inscription-div-input">
          <label className="inscription-label">
            <img src={iconMail} className="inscription-icon" alt="Icon" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
          </label>
          <label className="inscription-label">
            <img src={iconLock} className="inscription-icon" alt="Icon" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mot de passe"
              required
            />
          </label>
          <label className="inscription-label">
            <img src={iconprofil} className="inscription-icon" alt="Icon" />
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Nom d'utilisateur"
              required
            />
          </label>
        </div>
        <div className="inscription-position-buttons">
          <div className="inscription-button-co">
            <button className="button-prim" type="submit">
              S'inscrire
            </button>
          </div>
          <div className="inscription-button-co">
            <button className="button-sec" onClick={HandleClickCo}>
              Se connecter
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Inscription;
