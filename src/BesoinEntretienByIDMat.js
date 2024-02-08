import React, { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import { db } from "./Firebase.js";
import "./CSS/BesoinEntretienByID.css";

const BesoinEntretienID = ({ materielId }) => {
  const [BesoinEntretienID, setBesoinEntretienID] = useState([]);
  useEffect(() => {
    const BesoinEntretienByIDRef = ref(db, "BesoinEntretien");

    const unsubscribe = onValue(BesoinEntretienByIDRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const filteredData = Object.values(data).filter(
          (besoinEntretien) => besoinEntretien.IdMat === materielId
        );

        setBesoinEntretienID(filteredData);
      }
    });
    return () => unsubscribe();
  }, [materielId]);
  return (
    <div>
      {BesoinEntretienID.map((notice) => (
        <div key={notice.IdBesoinEntretien}>
          <div className="frameRetrecieNotice">
            <div className="TexteNotice">
              <p>{notice.TypeEntretien}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BesoinEntretienID;
