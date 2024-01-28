import React, { useEffect, useState } from "react";
import { GetListeEntretien, RecupererModeleMat } from "./queries";

const GetEntretien = () => {
  const [Entretien, setEntretien] = useState([]);

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
            console.log("GetEntretienData", GetEntretienData);
            console.log("testAvantultime", GetEntretien.IdMat);
            const IdMat = GetEntretien.IdMat;
            console.log("testultime", IdMat);
            const matData = await RecupererModeleMat(IdMat);
            console.log("tessssttssss", matData);

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

  return (
    <div>
      <h2>Liste des entretiens :</h2>
      <ul>
        {Entretien.map((besoin, index) => (
          <li key={index}>
            {console.log("besoin", besoin)}
            <p>Modele du matériel: {besoin.modeleMat}</p>
            <p>
              Type d'entretien : {besoin.GetEntretien.Entretien.TypeEntretien}
            </p>
            {/* <p>IDmat: {besoin.GetEntretien.IdMat}</p> */}
            <p>Date: {besoin.GetEntretien.Entretien.Date}</p>
            <p>Nombre Heure: {besoin.GetEntretien.Entretien.NbHeure}</p>
            <p>Observation: {besoin.GetEntretien.Entretien.Observation}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GetEntretien;
