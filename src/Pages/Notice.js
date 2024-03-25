import React, { useState, useEffect } from "react";
import { db } from "../Services/Firebase";
import { ref, onValue } from "firebase/database";
import { useLocation } from "react-router-dom";
import RetourArriere from "../Component/Component_App/RetourArriere";
import MenuOverlay from "../Component/Component_Notice/ParametreNotice";
import { RecupererModeleMat } from "../Component/Component_queries/queries.js";

const Notice = () => {
  const [besoinsEntretien, setBesoinsEntretien] = useState([]);
  const [IdNotice, setIdNotice] = useState("");
  const [modeleMat, setModeleMat] = useState(""); // État pour stocker le modèle du matériel
  const location = useLocation();
  const materielId = location.state?.materielId;
  const noticeId = location.state?.noticeId;

  useEffect(() => {
    if (materielId) {
      // Appel asynchrone pour récupérer le modèle du matériel
      RecupererModeleMat(materielId).then(setModeleMat).catch(console.error);

      const BesoinEntretienByIDRef = ref(db, "BesoinEntretien");

      const unsubscribe = onValue(BesoinEntretienByIDRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const filteredData = Object.values(data).filter(
            (besoinEntretien) =>
              besoinEntretien.IdMat === materielId &&
              besoinEntretien.IdBesoinEntretien === noticeId
          );
          setBesoinsEntretien(filteredData);
          setIdNotice(filteredData[0]?.IdBesoinEntretien);
        }
      });

      return () => unsubscribe();
    }
  }, [materielId, noticeId]);


  return (
    <div>
      <div className="Notice_head">
        <RetourArriere />
        <p className="Titre_Page">Détail</p>
      </div>
      {besoinsEntretien.map((notice) => (
        <div key={notice.IdBesoinEntretien}>
          <div className="Notice_ModVehicule_Menu">
            <p className="Notice_ModVehicule">{modeleMat}</p>
            <MenuOverlay
              table="BesoinEntretien"
              id={IdNotice}
              fields={besoinsEntretien}
            />
          </div>
          <div>
            <div className="Notice_typeEntretien">{notice.TypeEntretien}</div>
            <div className="Notice_Container_INformtionSupplemenatire">
              <div className="InformationsSupplementaires">
                <div className="InformationsSupplementaires-text">
                  <p className="InformationsSupplementaires-text-laber">
                    Période de l'entretien
                  </p>
                  <p>toutes les {notice.Periodicite} heures</p>
                </div>
                <div className="InformationsSupplementaires-text">
                  <p className="InformationsSupplementaires-text-laber">
                    Capacité en huile
                  </p>
                  <p>Il faut {notice.Capacite} litres d'huile </p>
                  <p>Type d'huile : {notice.TypeHuile}</p>
                </div>
                <div className="InformationsSupplementaires-text">
                  <p className="InformationsSupplementaires-text-laber">
                    Filtres
                  </p>
                  <p>Il faut {notice.NbFiltre} filtres</p>
                  <p>Référence filtre : {notice.RefFiltres?.join(" - ")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Notice;
