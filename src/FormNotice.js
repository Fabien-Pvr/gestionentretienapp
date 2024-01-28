import React, { useState, useEffect } from "react";
import { ref, set, get, push } from "firebase/database";
import { db } from "./Firebase";
import { RecupererIdMat, GetAllModeles } from "./queries"; // Assurez-vous que la fonction GetAllModeles est disponible dans vos queries

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
        Type d'entretien:
        <input
          type="text"
          value={TypeEntretien}
          onChange={(e) => setTypeEntretien(e.target.value)}
        />
      </label>

      <label>
        Périodicité de l'entretien:
        <input
          type="number"
          value={Periodicite}
          onChange={(e) => setPeriodicite(e.target.value)}
        />
      </label>
      <label>
        Capacité:
        <input
          type="number"
          value={Capacite}
          onChange={(e) => setCapacite(e.target.value)}
        />
      </label>
      <label>
        Type d'huile utilisée:
        <input
          type="text"
          value={TypeHuile}
          onChange={(e) => setTypeHuile(e.target.value)}
        />
      </label>
      <label>
        Nombre de filtre nécessaire:
        <input
          type="number"
          value={NbFiltre}
          onChange={(e) => setNbFiltre(e.target.value)}
        />
      </label>
      <label>
        Référence du premier Filtre:
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
