import React, { useState } from "react";
import { ref as databaseRef, set, push } from "firebase/database";
import "../CSS/FormMateriel.css";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  // getDownloadURL,
} from "firebase/storage";
import { db } from "../Firebase";

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

      const tracteurData = {
        IdMat: newTracteurRef.key,
        Modele,
        Puissance,
        MiseService,
        VidangeMoteur,
        NomImage,
      };
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

      <label className="FormImage">
        Ajouter une image
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
      </label>

      {NomImage && (
        <img className="image-preview" src={NomImage} alt="Preview" />
      )}

      <div className="FormMat">
        <label className="LabelForm">
          {/* Modèle: */}
          <input
            type="text"
            value={Modele}
            onChange={(e) => setModele(e.target.value)}
            placeholder=" Modèle du véhicule  "
            required
          />
        </label>

        <label className="LabelForm">
          <input
            type="number"
            value={Puissance}
            onChange={(e) => setPuissance(e.target.value)}
            placeholder=" Puissance du véhicule  "
            required
          />
        </label>

        <label className="LabelForm">
          <input
            type="date"
            value={MiseService}
            onChange={(e) => setMiseService(e.target.value)}
            required
          />
        </label>

        <label className="LabelForm">
          <input
            type="number"
            value={VidangeMoteur}
            onChange={(e) => setVidangeMoteur(e.target.value)}
            placeholder=" Première vidange moteur faite à  "
            required
          />
        </label>
      </div>
      <div className="PositionEnregistrer">
        <button type="submit">Enregistrer</button>
      </div>
    </form>
  );
};

export default TracteurFormIm;
