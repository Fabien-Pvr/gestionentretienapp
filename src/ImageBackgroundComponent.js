import React, { useEffect, useState } from "react";
import {
  getStorage,
  ref as storageRef,
  getDownloadURL,
} from "firebase/storage";

const BackgroundImageComponent = ({ vehicleId, imageName, children }) => {
  const [imageURL, setImageURL] = useState("");

  useEffect(() => {
    const fetchImageURL = async () => {
      try {
        const storage = getStorage();
        const imageRef = storageRef(
          storage,
          `images/${vehicleId}/${imageName}`
        );
        const url = await getDownloadURL(imageRef);
        setImageURL(url);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération de l'URL de l'image :",
          error.message
        );
      }
    };

    fetchImageURL();
  }, [vehicleId, imageName]);

  const backgroundStyles = {
    borderRadius: "15px",
    backgroundImage: imageURL ? `url("${imageURL}")` : "none",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    height: "158px",
    display: "flex",
  };

  return <div style={backgroundStyles}>{children}</div>;
};

export default BackgroundImageComponent;
