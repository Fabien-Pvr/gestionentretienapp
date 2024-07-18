import React, { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import { db } from "../../Services/Firebase.js";
import "../../CSS/MaterielList.css";
import BackgroundImageComponent from "../Component_queries/ImageBackgroundComponent.js";
import { Link } from "react-router-dom";
import { useAuth } from "../Component_Utilisateurs/AuthContext.js";
import useFindUserExploitation from "../composant_exploitation/UseFindUserExploitation.js";
import useGetExploitationData from "../Component_queries/UseGetexploitationData.js";
import { useNavigate } from "react-router-dom";

const MaterielList = () => {
  const [Materiel, setMateriel] = useState([]);
  const { currentUser } = useAuth();
  const idUser = currentUser ? currentUser.uid : null;
  console.log("iduser", idUser);
  // const navigate = useNavigate();
  // const activeBox = "materiel";

  const idExp = useFindUserExploitation(idUser);
  console.log("idExp", idExp);

  const dataExploitataion = useGetExploitationData(idExp);
  console.log("dataexp", dataExploitataion);
  console.log(dataExploitataion.exploitationInfo);

  useEffect(() => {
    console.log("blabla");
    if (idExp && dataExploitataion.exploitationInfo) {
      const MaterielRef = ref(db, "Materiel");
      const unsubscribe = onValue(MaterielRef, (snapshot) => {
        const data = snapshot.val();
        console.log("data", data);
        const filteredData = data
          ? Object.values(data).filter(
              (mat) =>
                mat.IdExploitation ===
                dataExploitataion.exploitationInfo.IdExploitation
            )
          : [];
        console.log("fdata", filteredData);

        setMateriel(filteredData);
      });
      return () => unsubscribe();
    }
  }, [idExp, dataExploitataion.exploitationInfo]);

  // const HandleClickAjout = (activeBox) => {
  //   navigate(`/ajout/${activeBox}`, { state: { activeBox } });
  // };

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
      {/* <div className="Container_Ajouter_detailVehicule_Ajouter">
        <button
          onClick={() => HandleClickAjout(activeBox)}
          className="button_Ajouter_detailVehicule_Mat"
        >
          +
        </button>
      </div> */}
    </div>
  );
};

export default MaterielList;
