import React, { useState, useEffect } from "react";
import { ref, set, get, push } from "firebase/database";
import { db } from "../Firebase";
import { RecupererIdMat, GetAllModeles } from "../Component_queries/queries";
import "../CSS/FormNotice_Entretien.css";

const NoticeForm = () => {
  const [modeles, setModeles] = useState([]);
  const [modele, setModele] = useState("");
  const [TypeEntretien, setTypeEntretien] = useState("");
  const [Periodicite, setPeriodicite] = useState("");
  const [Capacite, setCapacite] = useState("");
  const [TypeHuile, setTypeHuile] = useState("");
  const [NbFiltre, setNbFiltre] = useState("");
  const [RefFiltre1, setRefFiltre1] = useState("");
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
    if (
      isNaN(Number(Periodicite)) ||
      isNaN(Number(Capacite)) ||
      isNaN(Number(NbFiltre))
    ) {
      setError(
        "La périodicité de l'entretien, la capacité et le nombre de filtres doivent être des nombres."
      );
      return;
    }

    try {
      const IdMat = await RecupererIdMat(modele);

      if (IdMat) {
        const besoinEntretienRef = ref(db, "BesoinEntretien");
        const newNoticeRef = push(besoinEntretienRef);

        const noticeData = {
          IdBesoinEntretien: newNoticeRef.key,
          IdMat: IdMat,
          TypeEntretien,
          Periodicite,
          Capacite,
          TypeHuile,
          NbFiltre,
          RefFiltre1,
        };

        await set(newNoticeRef, noticeData);

        console.log("Notice enregistrée avec succès dans la base de données.");
        setModele("");
        setTypeEntretien("");
        setPeriodicite("");
        setCapacite("");
        setTypeHuile("");
        setNbFiltre("");
        setRefFiltre1("");
        setError(""); // Effacer les erreurs si la soumission est réussie
      } else {
        setError(`Aucun véhicule trouvé pour le modèle ${modele}.`);
      }
    } catch (error) {
      console.error(
        "Erreur lors de l'enregistrement de la notice :",
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
              <option className="NoticeForm-option-selection" key={m} value={m}>
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
            type="number"
            value={Periodicite}
            onChange={(e) => setPeriodicite(e.target.value)}
            placeholder="Périodicité de l'entretien"
            required
          />
        </label>
        <label className="LabelForm">
          <input
            type="number"
            value={Capacite}
            onChange={(e) => setCapacite(e.target.value)}
            placeholder="Capacité"
            required
          />
        </label>
        <label className="LabelForm">
          <input
            type="text"
            value={TypeHuile}
            onChange={(e) => setTypeHuile(e.target.value)}
            placeholder="Type d'huile utilisée"
            required
          />
        </label>
        <label className="LabelForm">
          <input
            type="number"
            value={NbFiltre}
            onChange={(e) => setNbFiltre(e.target.value)}
            placeholder="Nombre de filtre nécessaire"
            required
          />
        </label>
        <label className="LabelForm">
          <input
            type="text"
            value={RefFiltre1}
            onChange={(e) => setRefFiltre1(e.target.value)}
            placeholder="Référence du premier Filtre"
            required
          />
        </label>
      </div>
      <div className="PositionEnregistrer">
        <button type="submit">Enregistrer</button>
      </div>
    </form>
  );
};

export default NoticeForm;
