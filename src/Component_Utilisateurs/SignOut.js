import React from "react";
import { auth } from "../Firebase"; // Ajustez le chemin selon la structure de votre projet
import { signOut } from "firebase/auth";

const Deconnexion = () => {
  const signOut = () => {
    auth
      .signOut()
      .then(() => {
        console.log("Déconnecté");
      })
      .catch((error) => {
        console.error("Erreur lors de la déconnexion :", error);
      });
  };

  return <button onClick={signOut}>Déconnexion</button>;
};

export default Deconnexion;
