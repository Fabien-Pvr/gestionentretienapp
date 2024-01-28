import React, { useState } from "react";
import { ref, set, get, push } from "firebase/database";
import { db } from "./Firebase";

const TracteurForm = () => {
  const [Modele, setModele] = useState("");
  const [Puissance, setPuissance] = useState("");
  const [MiseService, setMiseService] = useState(
    new Date().toISOString().split("T")[0]
  ); // Utilisation de la date actuelle
  const [VidangeMoteur, setVidangeMoteur] = useState("");
  const [error, setError] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Vérifications du type de données
    if (isNaN(Number(Puissance)) || isNaN(Number(VidangeMoteur))) {
      setError("La Puissance et le nombre d'heures doivent être des nombres.");
      return;
    }

    try {
      const materielRef = ref(db, "Materiel");
      const newTracteurRef = push(materielRef); // Utilisation de push pour générer automatiquement la clé

      const tracteurData = {
        IdMat: newTracteurRef.key,
        Modele,
        Puissance,
        MiseService,
        VidangeMoteur,
      };

      await set(newTracteurRef, tracteurData);

      console.log("Tracteur enregistré avec succès dans la base de données.");
      setModele("");
      setPuissance("");
      setMiseService(new Date().toISOString().split("T")[0]); // Réinitialiser la date à la date actuelle
      setVidangeMoteur("");
      setError(""); // Effacer les erreurs si la soumission est réussie
    } catch (error) {
      console.error(
        "Erreur lors de l'enregistrement du tracteur :",
        error.message
      );
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <label>
        Modèle:
        <input
          type="text"
          value={Modele}
          onChange={(e) => setModele(e.target.value)}
        />
      </label>

      <label>
        Puissance:
        <input
          type="number"
          value={Puissance}
          onChange={(e) => setPuissance(e.target.value)}
        />
      </label>

      <label>
        Date de mise en service:
        <input
          type="date"
          value={MiseService}
          onChange={(e) => setMiseService(e.target.value)}
        />
      </label>

      <label>
        Nombre d'heures au moment de la première vidange:
        <input
          type="number"
          value={VidangeMoteur}
          onChange={(e) => setVidangeMoteur(e.target.value)}
        />
      </label>

      <button type="submit">Enregistrer</button>
    </form>
  );
};

export default TracteurForm;
