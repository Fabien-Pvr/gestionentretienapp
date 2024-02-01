import React, { useState } from "react";
import { ref as databaseRef, set, push } from "firebase/database";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  // getDownloadURL,
} from "firebase/storage";
import { db } from "./Firebase";

const TracteurFormIm = () => {
  const [Modele, setModele] = useState("");
  const [Puissance, setPuissance] = useState("");
  const [MiseService, setMiseService] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [VidangeMoteur, setVidangeMoteur] = useState("");
  const [ImageFile, setImageFile] = useState(null);
  const [NomImage, setNomImage] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Vérifications du type de données
    if (isNaN(Number(Puissance)) || isNaN(Number(VidangeMoteur))) {
      setError("La Puissance et le nombre d'heures doivent être des nombres.");
      return;
    }

    try {
      const materielRef = databaseRef(db, "Materiel");
      const newTracteurRef = push(materielRef);
      const NomImage = ImageFile.name;
      // Vérification si une image est sélectionnée
      if (ImageFile) {
        const storage = getStorage();
        const storageReference = storageRef(
          storage,
          `images/${newTracteurRef.key}/${ImageFile.name}`
        );
        setNomImage(NomImage);
        await uploadBytes(storageReference, ImageFile);
        console.log("Image uploaded successfully. NomImage:", NomImage);
      }
      console.log("test 33", NomImage);
      const tracteurData = {
        IdMat: newTracteurRef.key,
        Modele,
        Puissance,
        MiseService,
        VidangeMoteur,
        NomImage,
      };
      console.log(
        "Attempting to save tractor data to the database. Data:",
        tracteurData
      );
      await set(newTracteurRef, tracteurData);

      console.log("Tracteur enregistré avec succès dans la base de données.");
      setModele("");
      setPuissance("");
      setMiseService(new Date().toISOString().split("T")[0]);
      setVidangeMoteur("");
      setImageFile(null);
      setNomImage("");
      setError("");
    } catch (error) {
      console.error(
        "Erreur lors de l'enregistrement du tracteur :",
        error.message
      );
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <label>
        Modèle:
        <input
          type="text"
          value={Modele}
          onChange={(e) => setModele(e.target.value)}
        />
      </label>

      <label>
        Puissance:
        <input
          type="number"
          value={Puissance}
          onChange={(e) => setPuissance(e.target.value)}
        />
      </label>

      <label>
        Date de mise en service:
        <input
          type="date"
          value={MiseService}
          onChange={(e) => setMiseService(e.target.value)}
        />
      </label>

      <label>
        Nombre d'heures au moment de la première vidange:
        <input
          type="number"
          value={VidangeMoteur}
          onChange={(e) => setVidangeMoteur(e.target.value)}
        />
      </label>

      <label>
        Image:
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </label>

      {NomImage && (
        <img
          src={NomImage}
          alt="Preview"
          style={{ maxWidth: "100%", marginTop: "10px" }}
        />
      )}

      <button type="submit">Enregistrer</button>
    </form>
  );
};

export default TracteurFormIm;
