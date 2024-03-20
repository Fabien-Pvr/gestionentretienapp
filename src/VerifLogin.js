import React, { useState } from "react";
import { useAuth } from "./Component_Utilisateurs/AuthContext";
import Connexion from "./Component_Utilisateurs/Connexion"; // Votre composant de connexion
import Inscription from "./Component_Utilisateurs/Inscription"; // Votre composant d'inscription, assurez-vous de l'importer
import Application from "./AppAfterLogin"; // Le composant de la partie sécurisée de votre application
import "./CSS/VerifLogin.css";

const VerifLogin = () => {
  const { currentUser } = useAuth();
  const [isInscription, setIsInscription] = useState(false); // État pour contrôler l'affichage

  return (
    <div className="verifLogin-page">
      {currentUser && currentUser.emailVerified ? (
        <Application />
      ) : isInscription ? (
        <Inscription />
      ) : (
        <Connexion />
      )}

      <div className="verifLogin-button-position">
        {isInscription ? (
          <button
            className="verifLogin-button"
            onClick={() => setIsInscription(false)}
          >
            Se Connecter
          </button>
        ) : (
          <button
            className="verifLogin-button"
            onClick={() => setIsInscription(true)}
          >
            S'inscrire
          </button>
        )}
      </div>
    </div>
  );
};

export default VerifLogin;
