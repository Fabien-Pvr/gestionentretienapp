// queries.js
import { db } from "../Firebase";
import { ref, get } from "firebase/database";

const RecupererIdMat = async (Modele) => {
  try {
    const matModelRef = ref(db, "Materiel");
    const snapshot = await get(matModelRef);
    if (snapshot.exists()) {
      const materiels = snapshot.val();
      // Recherche du mat correspondant à IdMat
      const matKeys = Object.keys(materiels);
      for (const key of matKeys) {
        const matData = materiels[key];
        console.log("blebla", matData);
        console.log("testfinaljenaimarre", matData.IdMat);
        if (matData.Modele === Modele) {
          console.log("MatDataTest:", matData);
          const IdMat = matData.IdMat;
          console.log("modeleMat", IdMat);
          return IdMat;
        }
      }
    }
    return null;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des données :",
      error.message
    );
    return null;
  }
};

const RecupererModeleMat = async (IdMat) => {
  try {
    const matRef = ref(db, "Materiel");
    const snapshot = await get(matRef);
    if (snapshot.exists()) {
      const materiels = snapshot.val();
      // Recherche du mat correspondant à IdMat
      const matKeys = Object.keys(materiels);
      for (const key of matKeys) {
        const matData = materiels[key];
        if (matData.IdMat === IdMat) {
          const modeleMat = matData.Modele;
          return modeleMat;
        }
      }
    }
    return null;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des données :",
      error.message
    );
    return null;
  }
};

const ListeBesoinEntretien = async () => {
  const besoinEntretienRef = ref(db, "BesoinEntretien");
  const snapshot = await get(besoinEntretienRef);
  const besoinEntretienData = snapshot.val();

  if (besoinEntretienData) {
    // Utiliser Promise.all pour attendre la résolution de toutes les promesses
    const matDataPromises = Object.keys(besoinEntretienData).map(
      async (besoinEntretienId) => {
        const besoinEntretien = besoinEntretienData[besoinEntretienId];
        const IdMat = besoinEntretien.IdMat;
        console.log("testIdMat:", IdMat);

        //const matData = await Mat(IdMat);
        console.log("prout:", besoinEntretien);

        return {
          besoinEntretien: besoinEntretien,
          IdMat: IdMat,
        };
      }
    );

    const allMatData = await Promise.all(matDataPromises);

    return allMatData;
  }

  return [];
};

const GetListeEntretien = async () => {
  const EntretienRef = ref(db, "Entretien");
  const snapshot = await get(EntretienRef);
  const EntretienData = snapshot.val();
  console.log("EntretineData", EntretienData);

  if (EntretienData) {
    // Utiliser Promise.all pour attendre la résolution de toutes les promesses
    const matDataPromises = Object.keys(EntretienData).map(
      async (EntretienId) => {
        const Entretien = EntretienData[EntretienId];
        const IdMat = Entretien.IdMat;

        return {
          Entretien: Entretien,
          IdMat: IdMat,
        };
      }
    );

    const allMatData = await Promise.all(matDataPromises);

    return allMatData;
  }

  return [];
};

const countElements = async (Element) => {
  try {
    const ElementRef = ref(db, "Element");
    const snapshot = await get(ElementRef);

    if (snapshot && snapshot.exists()) {
      const count = Object.keys(snapshot.val()).length;
      console.log(`Nombre d'éléments dans la table ${Element} : ${count}`);
      return count;
    } else {
      console.log(`La table ${Element} n'existe pas ou est vide.`);
      return 0;
    }
  } catch (error) {
    console.error(
      "Erreur lors de la récupération du nombre d'éléments :",
      error.message
    );
    return 0;
  }
};

const GetAllModeles = async () => {
  try {
    const materielRef = ref(db, "Materiel");
    const snapshot = await get(materielRef);

    if (snapshot.exists()) {
      // Convertir le snapshot en tableau de modèles
      const modelesArray = Object.values(snapshot.val()).map(
        (materiel) => materiel.Modele
      );
      return modelesArray;
    } else {
      console.log("Aucun modèle trouvé dans la base de données.");
      return [];
    }
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des modèles :",
      error.message
    );
    return [];
  }
};

export {
  ListeBesoinEntretien,
  RecupererModeleMat,
  RecupererIdMat,
  GetListeEntretien,
  countElements,
  GetAllModeles,
};
