// EntretienList.js
import React, { useEffect, useState } from "react";
import { onValue, ref, get } from "firebase/database";
import { db } from "./Firebase";

const EntretienList = () => {
  const [besoinsEntretien, setBesoinsEntretien] = useState([]);

  useEffect(() => {
    const besoinsEntretienRef = ref(db, "BesoinEntretien");

    const unsubscribe = onValue(besoinsEntretienRef, (snapshot) => {
      const data = snapshot.val();

      console.log("Data from Firebase:", data); // Débogage

      if (data) {
        // Convertir l'objet de données en tableau d'objets
        const besoinsEntretienArray = Object.keys(data).map((key) => ({
          ...data[key],
          id: key,
        }));
        setBesoinsEntretien(besoinsEntretienArray);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h2>Liste des besoins d'entretien :</h2>
      <ul>
        {besoinsEntretien.map((besoin) => (
          <li key={besoin.id}>
            <p>Type d'entretien: {besoin.TypeEntretien}</p>
            <p>IDmat: {besoin.IdMat}</p>
            <p>NbFiltre: {besoin.NbFiltre}</p>
            <p>Capacite: {besoin.Capacite}</p>
            <p>Periodicite: {besoin.Periodicite}</p>
            <p>Référence du premier filtre : {besoin.RefFiltre1}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EntretienList;
