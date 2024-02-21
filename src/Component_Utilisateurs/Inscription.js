import React, { useState } from "react";
import { auth } from "../Firebase"; // Ajustez le chemin selon la structure de votre projet
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const Inscription = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  console.log(auth?.currentUser?.email);
  const signUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // Utilisateur créé, maintenant mise à jour du displayName
      if (userCredential.user) {
        await updateProfile(userCredential.user, {
          displayName: displayName,
        });
        console.log("DisplayName mis à jour :", displayName);
      }
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
      <input
        type="text"
        onChange={(e) => setDisplayName(e.target.value)}
        placeholder="Nom d'utilisateur"
      ></input>
      <button onClick={signUp}>S'inscrire</button>
    </div>
  );
};

export default Inscription;
