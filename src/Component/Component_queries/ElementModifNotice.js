import React, { useState, useEffect } from "react";
import { ref, set } from "firebase/database";
import { db } from "../../Services/Firebase";
import RetourArriere from "../Component_App/RetourArriere";
import "../../CSS/ModificationElement.css";
import Head from "../Component_App/Head";

const ElementModif = ({ idNotice, notice = {}, isFullscreen }) => {
  const [TypeEntretien, setTypeEntretien] = useState(
    notice.TypeEntretien || ""
  );
  const [Periodicite, setPeriodicite] = useState(notice.Periodicite || "");
  const [Capacite, setCapacite] = useState(notice.Capacite || "");
  const [TypeHuile, setTypeHuile] = useState(notice.TypeHuile || "");
  const [NbFiltre, setNbFiltre] = useState(notice.NbFiltre || "");
  const [RefFiltres, setRefFiltres] = useState(
    notice.RefFiltres || Array(Number(notice.NbFiltre)).fill("")
  );
  const [error, setError] = useState("");

  useEffect(() => {
    setRefFiltres(notice.RefFiltres || Array(Number(notice.NbFiltre)).fill(""));
  }, [notice.RefFiltres, notice.NbFiltre]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (
      isNaN(Number(Periodicite)) ||
      isNaN(Number(Capacite)) ||
      isNaN(Number(NbFiltre))
    ) {
      setError(
        "La périodicité, la capacité et le nombre de filtres doivent être des nombres."
      );
      return;
    }

    try {
      const besoinEntretienRef = ref(db, `BesoinEntretien/${idNotice}`);
      const noticeData = {
        IdBesoinEntretien: idNotice,
        IdMat: notice.IdMat,
        TypeEntretien,
        Periodicite: Number(Periodicite),
        Capacite: Number(Capacite),
        TypeHuile,
        NbFiltre: Number(NbFiltre),
        RefFiltres,
      };

      await set(besoinEntretienRef, noticeData);
      alert("Notice enregistrée avec succès dans la base de données.");

      console.log("Prêt à naviguer vers /notice");
    } catch (error) {
      console.error(
        "Erreur lors de l'enregistrement de la notice :",
        error.message
      );
    }
  };

  return (
    <div className={isFullscreen ? "fullscreenForm" : ""}>
      <header className="Notice_header">
        <Head />
      </header>

      <form onSubmit={handleFormSubmit}>
        <div className="ModifNotice_RetourArriere">
          <RetourArriere />
          <p className="ModifNotice_Titre">
            Modification des éléments de la notice
          </p>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div className="ModifNotice_FormNotice">
          <label className="LabelForm">
            <input
              type="text"
              value={TypeEntretien}
              onChange={(e) => setTypeEntretien(e.target.value)}
              placeholder={`Type d'entretien : ${notice.TypeEntretien}`}
            />
          </label>

          <label className="LabelForm">
            <input
              type="number"
              value={Periodicite}
              onChange={(e) => setPeriodicite(e.target.value)}
              placeholder={`Périodicité : ${notice.Periodicite}`}
            />
          </label>
          <label className="LabelForm">
            <input
              type="number"
              value={Capacite}
              onChange={(e) => setCapacite(e.target.value)}
              placeholder={`Capacité : ${notice.Capacite}`}
            />
          </label>
          <label className="LabelForm">
            <input
              type="text"
              value={TypeHuile}
              onChange={(e) => setTypeHuile(e.target.value)}
              placeholder={`Type d'huile : ${notice.TypeHuile}`}
            />
          </label>
          <label className="LabelForm">
            <input
              type="number"
              value={NbFiltre}
              onChange={(e) => setNbFiltre(e.target.value)}
              placeholder={`Nombre de filtres : ${notice.NbFiltre}`}
            />
          </label>
          {RefFiltres.map((refFiltre, index) => (
            <label key={index} className="LabelForm">
              <input
                type="text"
                value={refFiltre}
                onChange={(e) => {
                  const updatedRefs = [...RefFiltres];
                  updatedRefs[index] = e.target.value;
                  setRefFiltres(updatedRefs);
                }}
                placeholder={`Référence du filtre ${index + 1}`}
              />
            </label>
          ))}
        </div>
        <div className="PositionEnregistrer">
          <button type="submit">Enregistrer</button>
        </div>
      </form>
    </div>
  );
};

export default ElementModif;
