import React, { useEffect, useState } from 'react';
import { ListeBesoinEntretien, Mat } from './queries';

const BesoinEntretien = () => {
  const [besoinsEntretien, setBesoinsEntretien] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const besoinEntretienData = await ListeBesoinEntretien();
  
        if (!besoinEntretienData || !Array.isArray(besoinEntretienData)) {
          console.error("ListeBesoinEntretien n'a pas renvoyé de données valides.");
          return;
        }
  
        const newData = await Promise.all(besoinEntretienData.map(async (besoinEntretien) => {
          const idMat = besoinEntretien.IdMat;
          const matData = await Mat(idMat);
  
          return {
            besoinEntretien: besoinEntretien,
            matData: matData,
          };
        }));
  
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
            <p>Type d'entretien: {besoin.besoinEntretien.TypeEntretien}</p>
            <p>IDmat: {besoin.besoinEntretien.IdMat}</p>
            <p>NbFiltre: {besoin.besoinEntretien.NbFiltre}</p>
            <p>Capacite: {besoin.besoinEntretien.Capacite}</p>
            <p>Periodicite: {besoin.besoinEntretien.Periodicite}</p>
            <p>Référence du premier filtre : {besoin.besoinEntretien.RefFiltre1}</p>
            {/* Afficher la valeur du champ "Modele" dans votre composant */}
            <p>Modele du matériel: {besoin.matData && besoin.matData.Modele}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BesoinEntretien;
