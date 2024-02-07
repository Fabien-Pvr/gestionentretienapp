import React from "react";
import { useParams } from "react-router-dom";
import "./CSS/MaterielList.css";
import useGetMaterielData from "./UseGetMaterielData.js";
import MaterielByID from "./MaterielID.js";
import BesoinEntretienID from "./BesoinEntretienByIDMat.js";
import useGetBesoinEntretienData from "./UseGetBesoinEntretienData.js";

const VehicleDetails = () => {
  const { vehicleId } = useParams();
  console.log("vehicule", vehicleId);
  const valueMateriel = useGetMaterielData({ vehicleId });
  console.log("value", valueMateriel);

  // Ajoutez une vérification pour s'assurer que materielInfo n'est pas null
  const materielInfo = valueMateriel.materielInfo;

  return (
    <ul className="containerAll">
      <MaterielByID materielId={vehicleId} />
      <div className="TexteDetail">
        {console.log("test", materielInfo)}
        {materielInfo && ( // Ajoutez cette ligne pour vérifier que materielInfo existe avant d'essayer d'accéder à ses propriétés
          <>
            <p>mise en service le : {materielInfo.MiseService}</p>
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
