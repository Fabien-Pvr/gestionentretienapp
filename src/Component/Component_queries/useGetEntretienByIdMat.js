import { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import { db } from "../../Services/Firebase.js";

function useGetEntretienByIdMat(IdMat) {
  const [entretienInfo, setEntretienInfo] = useState([]);

  useEffect(() => {
    const EntretienInfoByIdMatRef = ref(db, "Entretien");
    const unsubscribe = onValue(EntretienInfoByIdMatRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const filteredData = Object.values(data).filter(
          (entretien) => entretien.IdMat === IdMat
        );
        setEntretienInfo(filteredData);
      }
    });
    return () => unsubscribe();
  }, [IdMat]);
  return entretienInfo;
}

export default useGetEntretienByIdMat;
