import React, { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import { db } from "./Firebase.js";

function useGetBesoinEntretienData(IdBesoinEntretien) {
  const [besoinEntretienInfo, setbesoinEntretienInfo] = useState(null);
  console.log("testIdBesoin", IdBesoinEntretien);
  console.log("testIdBesoin2", IdBesoinEntretien.vehicleId);

  useEffect(() => {
    console.log("IdBesoin:", IdBesoinEntretien.vehicleId);
    const besoinEntretienRef = ref(
      db,
      `BesoinEntretien/${IdBesoinEntretien.vehicleId}`
    );

    const unsubscribe = onValue(besoinEntretienRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setbesoinEntretienInfo(data);
        console.log("dataBesoin", data);
      }
    });

    return () => unsubscribe();
  }, [IdBesoinEntretien.vehicleId]);

  console.log("besoinEntretienInfo", besoinEntretienInfo);

  return { besoinEntretienInfo };
}

export default useGetBesoinEntretienData;
