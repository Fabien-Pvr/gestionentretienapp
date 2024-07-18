import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../CSS/MaterielList.css";
import useGetMaterielData from "./UseGetMaterielData.js";
import MaterielByID from "./MaterielID.js";
import BesoinEntretienID from "./BesoinEntretienByIDMat.js";
import useGetNoticeByIdMat from "../Component_queries/useNoticeDataByIdMat.js";
import useGetEntretienByIdMat from "../Component_queries/useGetEntretienByIdMat.js";
import EntretienByIdMat from "./EntretienByIdMat.js";
// import { act } from "react";

const ChoixNoticesEntretiens = ({ activeBox, handleClick }) => {
  return (
    <div className="barreChoix">
      <div
        className={activeBox === "notice" ? "nomActive" : "nomUnactive"}
        onClick={() => handleClick("notice")}
      >
        Notices
      </div>
      <div
        className={activeBox === "entretien" ? "nomActive" : "nomUnactive"}
        onClick={() => handleClick("entretien")}
      >
        Entretiens
      </div>
    </div>
  );
};

const VehicleDetails = () => {
  const { vehicleId } = useParams();
  const valueMateriel = useGetMaterielData({ vehicleId });
  const notices = useGetNoticeByIdMat(vehicleId) || [];
  const entretiens = useGetEntretienByIdMat(vehicleId) || [];

  const materielInfo = valueMateriel.materielInfo;

  const [activeBox, setActiveBox] = useState("notice");

  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR");
  };

  const handleClick = (page) => {
    setActiveBox(page);
  };

  const HandleClickNotice = (IdBesoinEntretien) => {
    navigate("/notice", {
      state: { materielId: vehicleId, noticeId: IdBesoinEntretien },
    });
  };

  const HandleClickAjout = (activeBox) => {
    navigate(`/ajout/${activeBox}`, { state: { activeBox } });
  };
  

  return (
    <ul className="containerAll">
      <MaterielByID materielId={vehicleId} />
      <div className="TexteDetail">
        {materielInfo && (
          <>
            <p>Mise en service le : {formatDate(materielInfo.MiseService)}</p>
            <p>
              Première vidange moteur effectuée à : {materielInfo.VidangeMoteur}{" "}
              heures
            </p>
          </>
        )}
      </div>
      <div className="Titre">
        <ChoixNoticesEntretiens
          activeBox={activeBox}
          handleClick={handleClick}
        />
        <div className="Container_Ajouter_detailVehicule_Ajouter">
          <button
            onClick={() => HandleClickAjout(activeBox)}
            className="button_Ajouter_detailVehicule"
          >
            +
          </button>
        </div>
      </div>
      {activeBox === "notice" &&
        notices.map(
          (item) =>
            item && (
              <div
                key={item.IdBesoinEntretien}
                onClick={() => HandleClickNotice(item.IdBesoinEntretien)}
              >
                <BesoinEntretienID notice={item} />
              </div>
            )
        )}
      {activeBox === "entretien" &&
        entretiens.map(
          (item) =>
            item && (
              <div key={item.idEntretien}>
                <EntretienByIdMat entretien={item} />
              </div>
            )
        )}
    </ul>
  );
};

export default VehicleDetails;
