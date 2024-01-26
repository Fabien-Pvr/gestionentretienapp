import React, { useState } from "react";
import { ref, set, get } from "firebase/database";
import { db } from "./Firebase";

const countElementsTracteur = async () => {
  try {
    const materielRef = ref(db, "Materiel");
    const snapshot = await get(materielRef);

    if (snapshot && snapshot.exists()) {
      const count = Object.keys(snapshot.val()).length;
      console.log(`Nombre d'éléments dans la table Materiel : ${count}`);
      return count;
    } else {
      console.log("La table Materiel n'existe pas ou est vide.");
      return 0;
    }
  } catch (error) {
    console.error(
      "Erreur lors de la récupération du nombre d'éléments :",
      error.message
    );
    return 0;
  }
};

const TracteurForm = () => {
  const [modele, setModele] = useState("");
  const [puissance, setPuissance] = useState("");
  const [MiseService, setMiseService] = useState("");
  const [VidangeMoteur, setVidangeMoteur] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const newId = (await countElementsTracteur()) + 1;

      const tracteurData = {
        IdMat: newId,
        modele,
        puissance,
        MiseService,
        VidangeMoteur,
      };

      const tracteurRef = ref(db, `Materiel/Tracteur${newId}`);
      await set(tracteurRef, tracteurData);

      console.log("Tracteur enregistré avec succès dans la base de données.");
      setModele("");
      setPuissance("");
      setMiseService("");
      setVidangeMoteur("");
    } catch (error) {
      console.error(
        "Erreur lors de l enregistrement du tracteur :",
        error.message
      );
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <label>
        Modèle:
        <input
          type="text"
          value={modele}
          onChange={(e) => setModele(e.target.value)}
        />
      </label>

      <label>
        Puissance:
        <input
          type="number"
          value={puissance}
          onChange={(e) => setPuissance(e.target.value)}
        />
      </label>

      <label>
        Date de mise en service:
        <input
          type="text"
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
