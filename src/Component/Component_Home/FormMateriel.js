import React, { useState, useEffect } from "react";
import { ref as databaseRef, set, push } from "firebase/database";
import { getStorage, ref as storageRef, uploadBytes } from "firebase/storage";
import { db } from "../../Services/Firebase.js";
import "../../CSS/FormMateriel.css";
import useFindUserExploitation from "../composant_exploitation/UseFindUserExploitation";
import useGetExploitationData from "../Component_queries/UseGetexploitationData.js";
import { useAuth } from "../Component_Utilisateurs/AuthContext.js";

const TracteurFormIm = () => {
  const [Modele, setModele] = useState("");
  const [Puissance, setPuissance] = useState("");
  const [MiseService, setMiseService] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [VidangeMoteur, setVidangeMoteur] = useState("");
  const [ImageFile, setImageFile] = useState(null);
  const [NomImage, setNomImage] = useState(""); // Utilisé pour stocker l'URL de prévisualisation
  const [error, setError] = useState("");

  const { currentUser } = useAuth();
  const idUser = currentUser ? currentUser.uid : null;

  const idExp = useFindUserExploitation(idUser);
  const dataExploitataion = useGetExploitationData(idExp);

  useEffect(() => {
    // Nettoie l'URL temporaire lors du démontage ou de la mise à jour de NomImage
    return () => {
      if (NomImage.startsWith("blob:")) {
        URL.revokeObjectURL(NomImage);
      }
    };
  }, [NomImage]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file); // Crée un URL temporaire
      setImageFile(file);
      setNomImage(previewUrl); // Utilise l'URL temporaire pour la prévisualisation
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (isNaN(Number(Puissance)) || isNaN(Number(VidangeMoteur))) {
      setError("La Puissance et le nombre d'heures doivent être des nombres.");
      return;
    }

    try {
      const materielRef = databaseRef(db, "Materiel");
      const newTracteurRef = push(materielRef);

      if (ImageFile) {
        const storage = getStorage();
        const storageReference = storageRef(
          storage,
          `images/${newTracteurRef.key}/${ImageFile.name}`
        );
        await uploadBytes(storageReference, ImageFile);
        console.log("Image uploaded successfully. NomImage:", ImageFile.name);
      }

      const tracteurData = {
        IdMat: newTracteurRef.key,
        Modele,
        Puissance,
        MiseService,
        VidangeMoteur,
        NomImage: ImageFile.name, // Stocke le nom de l'image pour la sauvegarde
        IdExploitation: dataExploitataion.exploitationInfo.IdExploitation,
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
      {/* Affiche la prévisualisation de l'image */}
      {NomImage.startsWith("blob:") && (
        <div className="image-preview-position">
          <div className="image-preview-fondNoir">
            <img className="image-preview" src={NomImage} alt="Preview" />
          </div>
        </div>
      )}
      <label className={`FormImage ${NomImage ? "image-changed" : ""}`}>
        {NomImage ? "Changer l'image" : "Ajouter une image"}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
      </label>

      <div className="FormMat">
        <label className="LabelForm">
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
