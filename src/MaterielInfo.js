import React, { useEffect, useState } from "react";
import { onValue, ref, child } from "firebase/database";
import { db } from "./Firebase.js";

const MaterielInfo = ({ IdMat }) => {
  const [materielInfo, setMaterielInfo] = useState(null);

  useEffect(() => {
    const materielRef = ref(db, `Materiel/${IdMat}`);
    console.log("materielRef", materielRef);
    const unsubscribe = onValue(materielRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setMaterielInfo(data);
        console.log("data", data);
      }
    });

    return () => unsubscribe();
  }, );
};

export default MaterielInfo;
