import React, { useEffect, useState } from "react";
import {
  GetListeEntretien,
  RecupererModeleMat,
} from "../Component_queries/queries";
import "../../CSS/Entretien.css";

const GetEntretien = () => {
  const [Entretien, setEntretien] = useState([]);
  console.log("test historique2");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const GetEntretienData = await GetListeEntretien();
        console.log("GetEntretienData:", GetEntretienData);
        if (GetEntretienData && Array.isArray(GetEntretienData)) {
          const newData = await Promise.all(
            GetEntretienData.map(async (GetEntretien) => {
              const IdMat = GetEntretien.IdMat;
              const matData = await RecupererModeleMat(IdMat);
              console.log("matData:", matData);

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

          console.log("newData:", newData);
          setEntretien(newData);
        } else {
          console.error(
            "GetListeEntretien n'a pas renvoyé de données valides."
          );
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des besoins d'entretien :",
          error
        );
      }
    };

    fetchData();
  }, []);
  console.log("test historique3");
  return (
    <div>
      {console.log("test historique4")}
      <ul className="ContainerAll">
        {Entretien.map((besoin, index) => (
          <div className="Entretien-ContainerFrame" key={index}>
            {console.log("test historique4")}
            <p className="ptest1">{besoin.modeleMat}</p>
            <p className="ptest2">
              {besoin.GetEntretien.Entretien.TypeEntretien}
            </p>
            <p className="ptest4">{besoin.GetEntretien.Entretien.Date}</p>
            <p className="ptest3">
              {besoin.GetEntretien.Entretien.NbHeure} heures au compteur
            </p>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default GetEntretien;
