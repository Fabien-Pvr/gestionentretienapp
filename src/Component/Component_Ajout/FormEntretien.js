import React, { useState, useEffect } from "react";
import { ref, set, push } from "firebase/database";
import { db } from "../../Services/Firebase.js";
import { RecupererIdMat, GetAllModeles } from "../Component_queries/queries";
import useFindUserExploitation from "../composant_exploitation/UseFindUserExploitation";
import useGetExploitationData from "../Component_queries/UseGetexploitationData.js";
import { useAuth } from "../Component_Utilisateurs/AuthContext.js";

const FormEntretien = () => {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [modele, setModele] = useState("");
  const [modeles, setModeles] = useState([]);
  const [NbHeure, setNbHeure] = useState("");
  const [Observation, setObservation] = useState("");
  const [TypeEntretien, setTypeEntretien] = useState("");
  const [error, setError] = useState("");

  const { currentUser } = useAuth();
  const idUser = currentUser ? currentUser.uid : null;

  const idExp = useFindUserExploitation(idUser);
  const dataExploitataion = useGetExploitationData(idExp);
  useEffect(() => {
    const fetchModeles = async () => {
      try {
        if (
          dataExploitataion &&
          dataExploitataion.exploitationInfo &&
          dataExploitataion.exploitationInfo.IdExploitation
        ) {
          const modelesList = await GetAllModeles(
            dataExploitataion.exploitationInfo.IdExploitation
          );

          setModeles(modelesList);
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des modèles :",
          error.message
        );
      }
    };

    if (idExp) {
      fetchModeles();
    }
  }, [idExp, dataExploitataion]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (isNaN(Number(NbHeure))) {
      setError("NbHeure doit être un nombre.");
      return;
    }

    try {
      const idMat = await RecupererIdMat(modele);

      if (idMat) {
        const entretienRef = ref(db, "Entretien");
        const newEntretienRef = push(entretienRef);

        const entretienData = {
          IdEntretien: newEntretienRef.key,
          Date: date,
          IdMat: idMat,
          NbHeure: NbHeure,
          Observation: Observation,
          TypeEntretien: TypeEntretien,
          IdExploitation: dataExploitataion.exploitationInfo.IdExploitation,
        };

        await set(newEntretienRef, entretienData);

        console.log(
          "Entretien enregistré avec succès dans la base de données."
        );
        setDate(new Date().toISOString().split("T")[0]);
        setModele("");
        setNbHeure("");
        setObservation("");
        setTypeEntretien("");
        setError("");
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
            type="date"
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
