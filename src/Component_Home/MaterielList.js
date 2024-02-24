import React, { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import { db } from "../Firebase.js";
import "../CSS/MaterielList.css";
import BackgroundImageComponent from "../Component_queries/ImageBackgroundComponent.js";
import { Link } from "react-router-dom";
import { useAuth } from "../Component_Utilisateurs/AuthContext.js";
import useFindUserExploitation from "../composant_exploitation/UseFindUserExploitation.js";

const MaterielList = () => {
  const [Materiel, setMateriel] = useState([]);
  const { currentUser } = useAuth();
  const idUser = currentUser ? currentUser.uid : null;

  const idExp = useFindUserExploitation(idUser);

  useEffect(() => {
    if (idExp) {
      // S'assurer que idExp est défini avant de faire la requête
      const MaterielRef = ref(db, "Materiel");
      const unsubscribe = onValue(MaterielRef, (snapshot) => {
        const data = snapshot.val();
        const filteredData = data
          ? Object.values(data).filter((mat) => mat.IdExploitation === idExp)
          : [];
        setMateriel(filteredData);
      });
      return () => unsubscribe();
    }
  }, [idExp]); // Ajout de idExp dans le tableau de dépendances pour refaire la requête quand idExp change

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
                <Link to={`/home/vehicule/${mat.IdMat}`}>
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
