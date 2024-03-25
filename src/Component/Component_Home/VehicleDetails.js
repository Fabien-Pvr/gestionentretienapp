import React from "react";
import { useParams } from "react-router-dom";
import "../../CSS/MaterielList.css";
import useGetMaterielData from "./UseGetMaterielData.js";
import MaterielByID from "./MaterielID.js";
import BesoinEntretienID from "./BesoinEntretienByIDMat.js";
import { useNavigate } from "react-router-dom";
import useGetNoticeByIdMat from "../Component_queries/useNoticeDataByIdMat.js";

const VehicleDetails = () => {
  const { vehicleId } = useParams();
  const valueMateriel = useGetMaterielData({ vehicleId });
  const notices = useGetNoticeByIdMat(vehicleId) || []; 
  const materielInfo = valueMateriel.materielInfo;

  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR");
  };

  const HandleClickNotice = (IdBesoinEntretien) => {
    navigate("/notice", {
      state: { materielId: vehicleId, noticeId: IdBesoinEntretien },
    });
  };

  return (
    <ul className="containerAll">
      <MaterielByID materielId={vehicleId} />
      <div className="TexteDetail">
        {materielInfo && (
          <>
            <p>Mise en service le : {formatDate(materielInfo.MiseService)}</p>
            <p>Première vidange moteur effectuée à : {materielInfo.VidangeMoteur} heures</p>
          </>
        )}
      </div>
      <div className="Titre">Notices disponible</div>
      {notices && notices.map((item) => (
        item && <div key={item.IdBesoinEntretien} onClick={() => HandleClickNotice(item.IdBesoinEntretien)}>
          <BesoinEntretienID notice={item} />
        </div>
      ))}
    </ul>
  );
};


export default VehicleDetails;
