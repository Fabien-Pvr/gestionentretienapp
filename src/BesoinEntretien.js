import React, { useEffect, useState } from 'react';
import { ListeBesoinEntretien, Mat } from './queries';

const BesoinEntretien = () => {
  const [besoinsEntretien, setBesoinsEntretien] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const besoinEntretienData = await ListeBesoinEntretien();
        console.log('besoinEntretienData', besoinEntretienData);
        if (!besoinEntretienData || !Array.isArray(besoinEntretienData)) {
          console.error("ListeBesoinEntretien n'a pas renvoyé de données valides.");
          return;
        }
  
        const newData = await Promise.all(besoinEntretienData.map(async (besoinEntretien) => {
          console.log('besoinEntretienData', besoinEntretienData);
          console.log('testAvantultime', besoinEntretien.IdMat)
          const IdMat = besoinEntretien.IdMat;
          console.log('testultime', IdMat)
          const matData = await Mat(IdMat);
          console.log('tessssttssss',besoinEntretien)
          return {
            besoinEntretien: besoinEntretien,
            matData: matData,
          };
        }));
  console.log('newData',newData)
        setBesoinsEntretien(newData);
      } catch (error) {
        console.error("Erreur lors de la récupération des besoins d'entretien :", error);
      }
    };
  
    fetchData();
  }, []);
  

  return (
    <div>
      <h2>Liste des besoins d'entretien :</h2>
      <ul>
        {besoinsEntretien.map((besoin, index) => (
          <li key={index}>
            <p>Type d'entretien: {besoin.besoinEntretien.besoinEntretien.TypeEntretien}</p>
            <p>IDmat: {besoin.besoinEntretien.IdMat}</p>
            <p>Modele du matériel: {besoin.matData && besoin.matData.Modele}</p>
            <p>NbFiltre: {besoin.besoinEntretien.besoinEntretien.NbFiltre}</p>
            <p>Capacite: {besoin.besoinEntretien.besoinEntretien.Capacite}</p>
            <p>Periodicite: {besoin.besoinEntretien.besoinEntretien.Periodicite}</p>
            <p>Référence du premier filtre : {besoin.besoinEntretien.besoinEntretien.RefFiltre1}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BesoinEntretien;
