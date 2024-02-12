import React, { useEffect, useState } from "react";
import {
  GetListeEntretien,
  RecupererModeleMat,
} from "../Component_queries/queries";
import "../CSS/Entretien.css";

const GetEntretien = () => {
  const [Entretien, setEntretien] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const GetEntretienData = await GetListeEntretien();
        console.log("GetEntretienData", GetEntretienData);
        if (!GetEntretienData || !Array.isArray(GetEntretienData)) {
          console.error(
            "GetListeEntretien n'a pas renvoyé de données valides."
          );
          return;
        }

        const newData = await Promise.all(
          GetEntretienData.map(async (GetEntretien) => {
            const IdMat = GetEntretien.IdMat;
            const matData = await RecupererModeleMat(IdMat);

            // Convertir la date de string à objet Date
            const formattedDate = new Date(
              GetEntretien.Entretien.Date
            ).toLocaleDateString("fr-FR");

            return {
              GetEntretien: {
                ...GetEntretien,
                Entretien: {
                  ...GetEntretien.Entretien,
                  Date: formattedDate,
                },
              },
              modeleMat: matData,
            };
          })
        );
        console.log("newData", newData);
        setEntretien(newData);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des besoins d'entretien :",
          error
        );
      }
    };

    fetchData();
  }, []);
  const handleItemClick = (id) => {
    if (selectedId === id) {
      // Si l'élément cliqué est déjà sélectionné, le désélectionner
      setSelectedId(null);
    } else {
      // Sinon, définir cet élément comme sélectionné
      setSelectedId(id);
    }
  };

  return (
    <div>
      <ul className="ContainerAll">
        {Entretien.map((besoin, index) => (
          <div
            className="Entretien-ContainerFrame"
            key={index}
            onClick={() => handleItemClick(index)} // Gestion du clic pour chaque élément
          >
            <p className="ptest1">{besoin.modeleMat}</p>
            <p className="ptest2">
              {besoin.GetEntretien.Entretien.TypeEntretien}
            </p>
            <p className="ptest4">{besoin.GetEntretien.Entretien.Date}</p>
            <p className="ptest3">
              {besoin.GetEntretien.Entretien.NbHeure} heures au compteur
            </p>
            {selectedId === index && (
              <p className="ptest3">
                {besoin.GetEntretien.Entretien.Observation}
              </p>
            )}
          </div>
        ))}
      </ul>
    </div>
  );
};

export default GetEntretien;
