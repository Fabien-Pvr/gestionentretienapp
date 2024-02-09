import React, { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import { db } from "../Firebase.js";
import "../CSS/BesoinEntretienByID.css";

const BesoinEntretienID = ({ materielId }) => {
  const [besoinsEntretien, setBesoinsEntretien] = useState([]);
  const [selectedEntretienId, setSelectedEntretienId] = useState(null);

  useEffect(() => {
    const BesoinEntretienByIDRef = ref(db, "BesoinEntretien");

    const unsubscribe = onValue(BesoinEntretienByIDRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const filteredData = Object.values(data).filter(
          (besoinEntretien) => besoinEntretien.IdMat === materielId
        );
        setBesoinsEntretien(filteredData);
      }
    });
    return () => unsubscribe();
  }, [materielId]);

  const toggleEntretien = (id) => {
    setSelectedEntretienId(selectedEntretienId === id ? null : id);
  };

  return (
    <div>
      {besoinsEntretien.map((notice) => (
        <div
          key={notice.IdBesoinEntretien}
          className="frameRetrecieNotice"
          onClick={() => toggleEntretien(notice.IdBesoinEntretien)}
        >
          <div
            className={`TexteNotice ${
              selectedEntretienId === notice.IdBesoinEntretien ? "active" : ""
            }`}
          >
            <p>{notice.TypeEntretien}</p>
            {selectedEntretienId === notice.IdBesoinEntretien && (
              <div className="InformationsSupplementaires">
                <div className="InformationsSupplementaires-text">
                  <p className="InformationsSupplementaires-text-laber">
                    Périodicité :{" "}
                  </p>
                  <p>{notice.Periodicite} heures</p>
                </div>
                <div className="InformationsSupplementaires-text">
                  <p className="InformationsSupplementaires-text-laber">
                    Capacité :{" "}
                  </p>
                  <p>
                    {notice.Capacite} - {notice.TypeHuile}
                  </p>
                </div>
                <div className="InformationsSupplementaires-text">
                  <p className="InformationsSupplementaires-text-laber">
                    Filtre :{" "}
                  </p>
                  <p>
                    {notice.NbFiltre} - {notice.RefFiltre1}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BesoinEntretienID;
