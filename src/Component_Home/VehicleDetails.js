import React from "react";
import { useParams } from "react-router-dom";
import "../CSS/MaterielList.css";
import useGetMaterielData from "./UseGetMaterielData.js";
import MaterielByID from "./MaterielID.js";
import BesoinEntretienID from "./BesoinEntretienByIDMat.js";

const VehicleDetails = () => {
  const { vehicleId } = useParams();
  console.log("vehicule", vehicleId);
  const valueMateriel = useGetMaterielData({ vehicleId });
  console.log("value", valueMateriel);

  // Ajoutez une vérification pour s'assurer que materielInfo n'est pas null
  const materielInfo = valueMateriel.materielInfo;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR");
  };

  return (
    <ul className="containerAll">
      <MaterielByID materielId={vehicleId} />
      <div className="TexteDetail">
        {console.log("test", materielInfo)}
        {materielInfo && (
          <>
            <p>Mise en service le : {formatDate(materielInfo.MiseService)}</p>
            <p>
              Première vidange moteur effectuée à : {materielInfo.VidangeMoteur}{" "}
              heures
            </p>
          </>
        )}
      </div>
      <div className="Titre">Entretiens possibles</div>
      <BesoinEntretienID materielId={vehicleId} />
    </ul>
  );
};

export default VehicleDetails;
