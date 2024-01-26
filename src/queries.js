// queries.js
import { db } from './Firebase';
import { ref,get } from 'firebase/database';


// const Mat = async (IdMat, setMatModele) => {
//     const matRef = ref(db,`Materiel/${IdMat}`);
//     const snapshot = await get(matRef);
//     const matData = snapshot.val();
  
//     if (matData) {
//       // Stocker la valeur du champ "Modele" dans le state
//       setMatModele(matData.Modele);
  
//       // Afficher la valeur dans la console à des fins de débogage
//       console.log('Modele:', matData.Modele);
//     }
// };


// const Mat = async (IdMat) => {
//     const matRef = ref(db, `Materiel/Tracteur1/${IdMat}`); // peut être ca qui bloque car tracteur1
//     const snapshot = await get(matRef);
//     const matData = snapshot.val();
//     console.log('MatData:', matData); // Ajoutez cette ligne pour déboguer
  
//     if (matData) {
//       return matData;
//     } else {
//       return null; // Ou une valeur par défaut si nécessaire
//     }
// };

const Mat = async (IdMat) => {
    try {
        const matRef = ref(db, 'Materiel');
        const snapshot = await get(matRef);
        if (snapshot.exists()) {
            const materiels = snapshot.val();
            // Recherche du mat correspondant à IdMat
            const matKeys = Object.keys(materiels);
            for (const key of matKeys) {
                const matData = materiels[key];
                console.log('blebla', matData)
                console.log('testfinaljenaimarre', matData.IdMat)
                if (matData.IdMat == IdMat) {
                    console.log('MatDataTest:', matData);
                    return matData;
                }
            }
        }

        // console.log(`Aucun mat trouvé avec l'IdMat : ${IdMat}`);
        return null;
    } catch (error) {
        // console.error('Erreur lors de la récupération des données :', error.message);
        // return null;
    }
};
  

const ListeBesoinEntretien = async () => {
    const besoinEntretienRef = ref(db, 'BesoinEntretien');
    const snapshot = await get(besoinEntretienRef);
    const besoinEntretienData = snapshot.val();

    if (besoinEntretienData) {
        // Utiliser Promise.all pour attendre la résolution de toutes les promesses
        const matDataPromises = Object.keys(besoinEntretienData).map(async (besoinEntretienId) => {
            const besoinEntretien = besoinEntretienData[besoinEntretienId];
            const IdMat = besoinEntretien.IdMat;
            console.log('testIdMat:', IdMat);

            //const matData = await Mat(IdMat);
            console.log('prout:', besoinEntretien);

            return {
                besoinEntretien: besoinEntretien,
                IdMat: IdMat,     
            };
        });

        const allMatData = await Promise.all(matDataPromises);

        return allMatData;
    }

    return [];
};



export { ListeBesoinEntretien, Mat };
