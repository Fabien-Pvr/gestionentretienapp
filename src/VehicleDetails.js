import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ref, onValue } from "firebase/database"; // Assurez-vous que cette importation est correctement utilisée ailleurs
import { db } from "./Firebase.js"; // Assurez-vous que cette importation est correctement utilisée ailleurs
import BesoinEntretienID from "./BesoinEntretienByID";
import MaterielByID from "./MaterielID.js";
import "./CSS/MaterielList.css";
import MaterielInfo from "./MaterielInfo.js";

const VehicleDetails = () => {
  const { vehicleId } = useParams();
  const [materielInfo, setMaterielInfo] = useState([]);

  useEffect(() => {
    const materielRef = ref(db, `Materiel/${vehicleId}`);

    const unsubscribe = onValue(materielRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setMaterielInfo([data]);
        console.log("data", data);
      }
    });

    return () => unsubscribe();
  }, [vehicleId]);

  return (
    <ul className="containerAll">
      <MaterielByID materielId={vehicleId} />
      {materielInfo.map((mat) => (
        <div className="TexteDetail">
          <p key={mat.IdMat}>Mise en service le : {mat.MiseService}</p>
          <p>
            Première vidange moteur effectuée à : {mat.VidangeMoteur} heures
          </p>
        </div>
      ))}
      <div className="Titre">Entretiens possibles</div>
      <BesoinEntretienID materielId={vehicleId} />
    </ul>
  );
};

export default VehicleDetails;
