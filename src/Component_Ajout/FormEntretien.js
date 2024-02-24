import React, { useState, useEffect } from "react";
import { ref, set, push } from "firebase/database";
import { db } from "../Firebase";
import { RecupererIdMat, GetAllModeles } from "../Component_queries/queries";
import useFindUserExploitation from "../composant_exploitation/UseFindUserExploitation";
import { useAuth } from "../Component_Utilisateurs/AuthContext.js";

const FormEntretien = () => {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]); // Utilisation de la date actuelle
  const [modele, setModele] = useState(""); // Ajout du champ pour le modèle
  const [modeles, setModeles] = useState([]);
  const [NbHeure, setNbHeure] = useState("");
  const [Observation, setObservation] = useState("");
  const [TypeEntretien, setTypeEntretien] = useState("");
  const [error, setError] = useState("");

  const { currentUser } = useAuth();
  const idUser = currentUser ? currentUser.uid : null;

  const idExp = useFindUserExploitation(idUser);

  useEffect(() => {
    const fetchModeles = async () => {
      try {
        const modelesList = await GetAllModeles(idExp);
        console.log("mod", modelesList); // Utilisez votre fonction pour récupérer la liste des modèles
        setModeles(modelesList);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des modèles :",
          error.message
        );
      }
    };

    fetchModeles();
  }, [idExp]);

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
          IdMat: idMat, // Utiliser l'IDmat récupéré
          NbHeure: NbHeure,
          Observation: Observation,
          TypeEntretien: TypeEntretien,
          IdExploitation: idExp,
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
      <div className="FormNotice">
        <label className="FormMenuDel">
          <select
            className="NoticeForm-selection-format"
            value={modele}
            onChange={(e) => setModele(e.target.value)}
          >
            <option value="" disabled>
              Sélectionnez un modèle
            </option>
            {modeles.map((m) => (
              <option
                className="NoticeForm-option-selection"
                key={m.IdMat}
                value={m}
              >
                {m}
              </option>
            ))}
          </select>
        </label>

        <label className="LabelForm">
          <input
            type="text"
            value={TypeEntretien}
            onChange={(e) => setTypeEntretien(e.target.value)}
            placeholder="Type d'entretien"
            required
          />
        </label>

        <label className="LabelForm">
          <input
            type="date" // Utilisation du type 'date' pour le champ de date
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </label>

        <label className="LabelForm">
          <input
            type="number"
            value={NbHeure}
            onChange={(e) => setNbHeure(e.target.value)}
            placeholder="Nombre d'heures au compteur"
            required
          />
        </label>

        <label className="LabelForm">
          <input
            type="text"
            value={Observation}
            onChange={(e) => setObservation(e.target.value)}
            placeholder="Observations - remarques"
          />
        </label>
      </div>
      <div className="PositionEnregistrer">
        <button type="submit">Enregistrer</button>
      </div>
    </form>
  );
};

export default FormEntretien;
