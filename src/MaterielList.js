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
      {/* <h2>Liste du matériel :</h2> */}
      <ul>
        {Materiel.map((mat) => (
          <div className="containerAffichageMat" key={mat.IdMat}>
            <p className="TextBig">Modèle: {mat.Modele}</p>
            <p className="TextBig">Puissance: {mat.Puissance} chevaux </p>
            <p className="TextSmall">Mise en service le : {mat.MiseService}</p>
            <p className="TextSmall">
              1ère vidange moteur faite à {mat.VidangeMoteur} heures
            </p>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default MaterielList;
