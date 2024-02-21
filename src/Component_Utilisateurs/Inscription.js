import React, { useState } from "react";
import { auth } from "../Firebase"; // Ajustez le chemin selon la structure de votre projet
import { createUserWithEmailAndPassword } from "firebase/auth";

const Inscription = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log(auth?.currentUser?.email);
  const signUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("Utilisateur créé :", userCredential.user);
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error.message);
    }
  };

  return (
    <div>
      <h2>Inscription</h2>
      <input
        type="email"
        // value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        // value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Mot de passe"
      />
      <button onClick={signUp}>S'inscrire</button>
    </div>
  );
};

export default Inscription;
