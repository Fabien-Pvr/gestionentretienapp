import { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import { db } from "../Firebase.js";

function useGetBesoinEntretienData(IdBesoinEntretien) {
  const [besoinEntretienInfo, setbesoinEntretienInfo] = useState(null);
 

  useEffect(() => {

    const besoinEntretienRef = ref(
      db,
      `BesoinEntretien/${IdBesoinEntretien.vehicleId}`
    );

    const unsubscribe = onValue(besoinEntretienRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setbesoinEntretienInfo(data);

      }
    });

    return () => unsubscribe();
  }, [IdBesoinEntretien.vehicleId]);



  return { besoinEntretienInfo };
}

export default useGetBesoinEntretienData;
