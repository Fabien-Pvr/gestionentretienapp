import React, { useEffect, useState } from 'react';
import { onValue, ref } from 'firebase/database';
import { db } from './Firebase.js'; 


const MaterielList = () => {
    const [Materiel, setMateriel] = useState([])
    useEffect(() => {
        const MaterielRef = ref(db, 'Materiel');
        const unsubscribe = onValue(MaterielRef, (snapshot) => {
            const data = snapshot.val();
            if (data) { setMateriel(Object.values(data)); }
        });
        return () => unsubscribe();
    }, []);

    return (
        <div>
          <h2>Liste du matériel :</h2>
          <ul>
            {Materiel.map((mat) => (
              <li key={mat.IDmat}>
                <p>Modèle: {mat.Modele}</p>
                <p>Puissance: {mat.Puissance} chevaux </p>
                <p>Mise en suceur le : {mat.MiseService}</p>
                <p>1ère pipe moteur faite à {mat.VidangeMoteur} heures</p>
              </li>
            ))}
          </ul>
        </div>
      );
    };
    
export default MaterielList;
    

