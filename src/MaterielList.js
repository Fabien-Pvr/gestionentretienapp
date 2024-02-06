import React, { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import { db } from "./Firebase.js";
import "./CSS/MaterielList.css";
import BackgroundImageComponent from "./ImageBackgroundComponent.js";
import { Link } from "react-router-dom";

const MaterielList = () => {
  const [Materiel, setMateriel] = useState([]);
  useEffect(() => {
    const MaterielRef = ref(db, "Materiel");
    const unsubscribe = onValue(MaterielRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setMateriel(Object.values(data));
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <ul className="containerAll">
        {Materiel.map((mat) => (
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
              <div>
                <Link to={`/vehicule/${mat.IdMat}`} >
                  <button className="Button">Voir plus</button>
                </Link>
              </div>
            </div>
          </BackgroundImageComponent>
        ))}
      </ul>
    </div>
  );
};

export default MaterielList;
