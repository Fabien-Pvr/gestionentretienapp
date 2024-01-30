import React, { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import { db } from "./Firebase.js";
import "./CSS/MaterielList.css";

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
          <div className="ContainerFrame">
            <div className="containerAffichageMat" key={mat.IdMat}>
              <div className="TextInfoFrame">
                <p className="TextBig">{mat.Modele}</p>
                <p className="TextSmall">{mat.Puissance} chevaux </p>
              </div>
              <div>
                <button className="Button"> Voir plus</button>
              </div>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default MaterielList;
