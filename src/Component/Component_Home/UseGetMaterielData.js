import { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import { db } from "../../Services/Firebase.js";

function useGetMaterielData(IdMat) {
  const [materielInfo, setMaterielInfo] = useState(null);

  useEffect(() => {
    const materielRef = ref(db, `Materiel/${IdMat.vehicleId}`);

    const unsubscribe = onValue(materielRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setMaterielInfo(data);
      }
    });

    return () => unsubscribe();
  }, [IdMat.vehicleId]);

  return { materielInfo };
}

export default useGetMaterielData;
