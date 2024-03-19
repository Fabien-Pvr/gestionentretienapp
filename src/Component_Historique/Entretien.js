import React, { useEffect, useState } from "react";
import {
  GetListeEntretien,
  RecupererModeleMat,
} from "../Component_queries/queries";
import useGetExploitationData from "../Component_queries/UseGetexploitationData.js";
import "../CSS/Entretien.css";
import { useAuth } from "../Component_Utilisateurs/AuthContext.js";
import useFindUserExploitation from "../composant_exploitation/UseFindUserExploitation.js";

const GetEntretien = () => {
  const [Entretien, setEntretien] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const { currentUser } = useAuth();
  const idUser = currentUser ? currentUser.uid : null;

  const idExp = useFindUserExploitation(idUser);
  const dataExploitataion = useGetExploitationData(idExp);

  
  useEffect(() => {
  const fetchData = async () => {
    try {
      // Assurez-vous que les données de l'exploitation sont chargées
      if (dataExploitataion && dataExploitataion.exploitationInfo) {
        const GetEntretienData = await GetListeEntretien();
        console.log("GetEntretienData", GetEntretienData);
        if (!GetEntretienData || !Array.isArray(GetEntretienData)) {
          console.error("GetListeEntretien n'a pas renvoyé de données valides.");
          return;
        }

        console.log("idExp", idExp);
        const filteredEntretiens = GetEntretienData.filter(
          (entretien) => entretien.IdExploitation === dataExploitataion.exploitationInfo.IdExploitation
        );
        console.log("filtre", filteredEntretiens);

        const newData = await Promise.all(
          filteredEntretiens.map(async (GetEntretien) => {
            const IdMat = GetEntretien.IdMat;
            const matData = await RecupererModeleMat(IdMat);

            // Convertir la date de string à objet Date
            const formattedDate = new Date(GetEntretien.Entretien.Date).toLocaleDateString("fr-FR");

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
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des besoins d'entretien :", error);
    }
  };

  if (idExp) {
    fetchData();
  }
}, [idExp, dataExploitataion]); // Ajouter dataExploitataion dans les dépendances pour recharger les données si elles changent


  const handleItemClick = (id) => {
    setSelectedId((prevId) => (prevId === id ? null : id));
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
