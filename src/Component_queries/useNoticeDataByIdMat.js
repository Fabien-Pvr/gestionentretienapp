import { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import { db } from "../Firebase.js";

function useGetNoticeByIdMat(IdMat) {
  const [noticeInfo, setNoticeInfo] = useState([null]);

  useEffect(() => {
    const BesoinEntretienByIDRef = ref(db, "BesoinEntretien");

    const unsubscribe = onValue(BesoinEntretienByIDRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {

        const filteredData = Object.values(data).filter(
          (notice) => notice.IdMat === IdMat
        );
        setNoticeInfo(filteredData);
      }
    });


    return () => unsubscribe();
  }, [IdMat]);

  return noticeInfo;
}

export default useGetNoticeByIdMat;
