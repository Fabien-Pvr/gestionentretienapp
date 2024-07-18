import React, { useState, useEffect } from "react";
import "../../CSS/Entretien.css";
import { RecupererModeleMat } from "../Component_queries/queries";

const EntretienByIdMat = ({ entretien }) => {
  const [selectedEntretienId, setSelectedEntretienId] = useState(null);

  useEffect(() => {
    const fetchModeleMat = async () => {
      const modele = await RecupererModeleMat(entretien.IdMat);
      setModeleMat(modele);
    };

    fetchModeleMat();
  }, [entretien.IdMat]);

  const toggleEntretien = (id) => {
    setSelectedEntretienId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div>
      <ul className="ContainerAll_Entretien">
        <div
          className="Entretien-ContainerFrame-Fille"
          key={entretien.IdEntretien}
          onClick={() => toggleEntretien(entretien.IdEntretien)}
        >
          {/* <p className="ptest1">{modeleMat}</p> */}
          <p className="ptest2">{entretien.TypeEntretien}</p>
          <p className="ptest4">{entretien.Date}</p>
          <p className="ptest3">{entretien.NbHeure} heures au compteur</p>
          {selectedEntretienId === entretien.IdEntretien && (
            <p className="ptest3">{entretien.Observation}</p>
          )}
        </div>
      </ul>
    </div>
  );
};

export default EntretienByIdMat;
