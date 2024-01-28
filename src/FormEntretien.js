import React, { useState, useEffect } from "react";
import { ref, set, get, push } from "firebase/database";
import { db } from "./Firebase";
import { RecupererIdMat, GetAllModeles } from "./queries";

const FormEntretien = () => {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]); // Utilisation de la date actuelle
  const [modele, setModele] = useState(""); // Ajout du champ pour le modèle
  const [modeles, setModeles] = useState([]);
  const [NbHeure, setNbHeure] = useState("");
  const [Observation, setObservation] = useState("");
  const [TypeEntretien, setTypeEntretien] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchModeles = async () => {
      try {
        const modelesList = await GetAllModeles(); // Utilisez votre fonction pour récupérer la liste des modèles
        setModeles(modelesList);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des modèles :",
          error.message
        );
      }
    };

    fetchModeles();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Vérifications du type de données
    if (isNaN(Number(NbHeure))) {
      setError("NbHeure doit être un nombre.");
      return;
    }

    try {
      const idMat = await RecupererIdMat(modele);

      if (idMat) {
        const entretienRef = ref(db, "Entretien");
        const newEntretienRef = push(entretienRef); // Utilisation de push pour générer automatiquement la clé

        const entretienData = {
          IdEntretien: newEntretienRef.key,
          Date: date,
          IDMat: idMat, // Utiliser l'IDmat récupéré
          NbHeure: NbHeure,
          Observation: Observation,
          TypeEntretien: TypeEntretien,
        };

        await set(newEntretienRef, entretienData);

        console.log(
          "Entretien enregistré avec succès dans la base de données."
        );
        setDate(new Date().toISOString().split("T")[0]); // Réinitialiser la date à la date actuelle
        setModele("");
        setNbHeure("");
        setObservation("");
        setTypeEntretien("");
        setError(""); // Effacer les erreurs si la soumission est réussie
      } else {
        setError(`Aucun IDmat trouvé pour le modèle ${modele}.`);
      }
    } catch (error) {
      console.error(
        "Erreur lors de l'enregistrement de l'entretien :",
        error.message
      );
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <label>
        Modèle:
        <select value={modele} onChange={(e) => setModele(e.target.value)}>
          <option value="" disabled>
            Sélectionnez un modèle
          </option>
          {modeles.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </label>

      <label>
        Type d'entretien :
        <input
          type="text"
          value={TypeEntretien}
          onChange={(e) => setTypeEntretien(e.target.value)}
        />
      </label>

      <label>
        Date :
        <input
          type="date" // Utilisation du type 'date' pour le champ de date
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </label>

      <label>
        NbHeure :
        <input
          type="number"
          value={NbHeure}
          onChange={(e) => setNbHeure(e.target.value)}
        />
      </label>

      <label>
        Observation :
        <input
          type="text"
          value={Observation}
          onChange={(e) => setObservation(e.target.value)}
        />
      </label>

      <button type="submit">Enregistrer</button>
    </form>
  );
};

export default FormEntretien;
