import React, { useState } from "react";
import { ref, set, get } from "firebase/database";
import { db } from "./Firebase";

const countElementsBesoinEntretien = async () => {
  try {
    const BesoinEntretienRef = ref(db, "BesoinEntretien");
    const snapshot = await get(BesoinEntretienRef);

    if (snapshot && snapshot.exists()) {
      const count = Object.keys(snapshot.val()).length;
      console.log(`Nombre d'éléments dans la table BesoinEntretien : ${count}`);
      return count;
    } else {
      console.log("La table BesoinEntretien n'existe pas ou est vide.");
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

const NoticeForm = () => {
  const [modele, setModele] = useState("");
  const [TypeEntretien, setTypeEntretien] = useState("");
  const [Periodicite, setPeriodicite] = useState("");
  const [Capacite, setCapacite] = useState("");
  const [TypeHuile, setTypeHuile] = useState("");
  const [NbFiltre, setNbFiltre] = useState("");
  const [RefFiltre1, setRefFiltre1] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const newId = (await countElementsBesoinEntretien()) + 1;

      const noticeData = {
        IdBesoinEntretien: newId,
        TypeEntretien,
        Periodicite,
        Capacite,
        TypeHuile,
        NbFiltre,
        RefFiltre1,
      };

      const BesoinEntretienRef = ref(db, `BesoinEntretien/Besoin${newId}`);
      await set(BesoinEntretienRef, noticeData);

      console.log("Notice enregistré avec succès dans la base de données.");
      setModele("");
      setTypeEntretien("");
      setPeriodicite("");
      setCapacite("");
      setTypeHuile("");
      setNbFiltre("");
      setRefFiltre1("");
    } catch (error) {
      console.error(
        "Erreur lors de l enregistrement de la notice :",
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
        Type d'entretien:
        <input
          type="text"
          value={TypeEntretien}
          onChange={(e) => setTypeEntretien(e.target.value)}
        />
      </label>

      <label>
        Périodicité de l'entretien :
        <input
          type="number"
          value={Periodicite}
          onChange={(e) => setPeriodicite(e.target.value)}
        />
      </label>
      <label>
        Capacité :
        <input
          type="number"
          value={Capacite}
          onChange={(e) => setCapacite(e.target.value)}
        />
      </label>
      <label>
        Type d'huile utilisée :
        <input
          type="text"
          value={TypeHuile}
          onChange={(e) => setTypeHuile(e.target.value)}
        />
      </label>
      <label>
        Nombre de filtre nécessaire :
        <input
          type="number"
          value={NbFiltre}
          onChange={(e) => setNbFiltre(e.target.value)}
        />
      </label>
      <label>
        Référence du premier Filtre :
        <input
          type="text"
          value={RefFiltre1}
          onChange={(e) => setRefFiltre1(e.target.value)}
        />
      </label>

      <button type="submit">Enregistrer</button>
    </form>
  );
};

export default NoticeForm;
