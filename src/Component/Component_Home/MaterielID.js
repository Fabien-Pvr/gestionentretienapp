import React, { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import { db } from "../../Services/Firebase.js";
import "../../CSS/MaterielList.css";
import BackgroundImageComponent from "../Component_queries/ImageBackgroundComponent.js";

const MaterielByID = ({ materielId }) => {
  const [materiel, setMateriel] = useState([]);

  useEffect(() => {
    const materielRef = ref(db, "Materiel");
    const unsubscribe = onValue(materielRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const filteredData = Object.values(data).filter(
          (item) => item.IdMat === materielId
        );
        setMateriel(filteredData);
      }
    });
    return () => unsubscribe();
  }, [materielId]);

  return (
    <div>
      {materiel.map((mat) => (
        <BackgroundImageComponent
          key={mat.IdMat}
          vehicleId={mat.IdMat}
          imageName={mat.NomImage}
        >
          <div className="containerAffichageMat">
            <div className="TextInfoFrame">
              <p className="TextBig">{mat.Modele}</p>
              <p className="TextSmall">{mat.Puissance} chevaux </p>
            </div>
          </div>
        </BackgroundImageComponent>
      ))}
    </div>
  );
};

export default MaterielByID;
