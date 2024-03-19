import React, { useState, useEffect } from "react";
import { db } from "../Firebase";
import { ref, onValue } from "firebase/database";
import { useLocation } from "react-router-dom";
import RetourArriere from "../Component_App/RetourArriere";
import Head from "../Component_App/Head";
import MenuOverlay from "../Component_Notice/ParametreNotice";
import useGetNoticeByIdMat from "../Component_queries/useNoticeDataByIdMat.js";

const Notice = () => {
  const [besoinsEntretien, setBesoinsEntretien] = useState([]);
  const [IdNotice, setIdNotice] = useState("");
  const location = useLocation();
  const materielId = location.state?.materielId;
  const noticeId = location.state?.noticeId;
  const table = "BesoinEntretien";

  useEffect(() => {
    if (materielId) {
      const BesoinEntretienByIDRef = ref(db, "BesoinEntretien");

      const unsubscribe = onValue(BesoinEntretienByIDRef, (snapshot) => {
        const data = snapshot.val();
        console.log(materielId, noticeId);
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
  }, [materielId]);
  return (
    <div>
      <div className="Notice_head">
        <RetourArriere />
        <p className="Titre_Page">Détail</p>
      </div>
      {besoinsEntretien.map((notice) => (
        <div key={notice.IdBesoinEntretien}>
          <div className="Notice_ModVehicule_Menu">
            <p className="Notice_ModVehicule">{notice.IdMat}</p>
            <MenuOverlay
              table={table}
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
                    Période de l'entretien{" "}
                  </p>
                  <p> toutes les {notice.Periodicite} heures</p>
                </div>
                <div className="InformationsSupplementaires-text">
                  <p className="InformationsSupplementaires-text-laber">
                    Capacité en huile{" "}
                  </p>
                  <p>Il faut {notice.Capacite} litres d'huile </p>
                  <p> Type d'huile : {notice.TypeHuile}</p>
                </div>
                <div className="InformationsSupplementaires-text">
                  <p className="InformationsSupplementaires-text-laber">
                    Filtres{" "}
                  </p>
                  <p>Il faut {notice.NbFiltre} filtres</p>
                  <p> Référence filtre : {notice.RefFiltre1}</p>
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
