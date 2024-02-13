import { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import { db } from "../Firebase.js";

function useGetMaterielData(IdMat) {
  const [materielInfo, setMaterielInfo] = useState(null);
  console.log("testIdMat", IdMat);

  useEffect(() => {
    console.log("IdMat:", IdMat.vehicleId);
    const materielRef = ref(db, `Materiel/${IdMat.vehicleId}`);

    const unsubscribe = onValue(materielRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setMaterielInfo(data);
        console.log("data", data);
      }
    });

    return () => unsubscribe();
  }, [IdMat.vehicleId]);
  console.log("materielInfo", materielInfo);
  return { materielInfo };
}

export default useGetMaterielData;
