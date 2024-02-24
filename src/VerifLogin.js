// MaPage.js

import React, { useState } from "react";
import { useAuth } from "./Component_Utilisateurs/AuthContext";
import Connexion from "./Component_Utilisateurs/Connexion"; // Votre composant de connexion
import Inscription from "./Component_Utilisateurs/Inscription"; // Votre composant d'inscription, assurez-vous de l'importer
import Application from "./AppAfterLogin"; // Le composant de la partie sécurisée de votre application

const VerifLogin = () => {
  const { currentUser } = useAuth();
  const [isInscription, setIsInscription] = useState(false); // État pour contrôler l'affichage

  return (
    <div>
      {currentUser && currentUser.emailVerified ? (
        <Application />
      ) : isInscription ? (
        <Inscription />
      ) : (
        <Connexion />
      )}

      <div>
        {isInscription ? (
          <button onClick={() => setIsInscription(false)}>
            J'ai déjà un compte, me connecter
          </button>
        ) : (
          <button onClick={() => setIsInscription(true)}>
            Je n'ai pas de compte, m'inscrire
          </button>
        )}
      </div>
    </div>
  );
};

export default VerifLogin;
