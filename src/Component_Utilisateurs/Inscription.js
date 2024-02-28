import React, { useState, useEffect } from "react";
import { auth, db } from "../Firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { ref, set, onValue } from "firebase/database";
import { GetAllExploitations } from "../Component_queries/queries";
import { Navigate } from "react-router-dom";
import logo from "../image/LogoP2I.svg"; // Assurez-vous que le chemin d'accès est correct
import iconprofil from "../image/icon-profil.png";
import iconLock from "../image/icon-Lock.png";
import iconMail from "../image/icon-mail.png";
import "../CSS/Inscription.css";

const Inscription = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [exploitations, setExploitations] = useState([]);
  const [exploitation, setExploitation] = useState("");
  const [error, setError] = useState("");
  const [userId, setUserId] = useState("");
  const [radioValue, setRadioValue] = useState("");
  useEffect(() => {
    const fetchExploitation = async () => {
      try {
        const exploitationList = await GetAllExploitations();
        if (Array.isArray(exploitationList)) {
          setExploitations(exploitationList);
        } else {
          setExploitations([]);
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des exploitations :",
          error.message
        );
      }
    };

    fetchExploitation();
  }, []);

  const signUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user) {
        await updateProfile(userCredential.user, { displayName });
        await sendEmailVerification(userCredential.user)
          .then(() => {
            console.log("Email de vérification envoyé");
          })
          .catch((error) => {
            console.error(
              "Erreur lors de l'envoi de l'email de vérification :",
              error
            );
          });

        await set(ref(db, `Users/${userCredential.user.uid}`), {
          IdUser: userCredential.user.uid,
          NomUser: displayName,
          StatutUser: "Salarié",
        });
        setUserId(userCredential.user.uid);

        if (exploitation) {
          const exploitationRef = ref(db, `Exploitation/${exploitation}`);
          onValue(
            exploitationRef,
            (snapshot) => {
              const data = snapshot.val();
              if (data) {
                const updatedData = {
                  ...data,
                  IdUser: userCredential.user.uid,
                };
                set(exploitationRef, updatedData)
                  .then(() => {
                    console.log("Exploitation mise à jour avec succès !");
                  })
                  .catch((error) => {
                    console.error(
                      "Erreur lors de la mise à jour de l'exploitation :",
                      error
                    );
                  });
              }
            },
            { onlyOnce: true }
          ); // Utilisez { onlyOnce: true } pour écouter une seule fois
        }
        Navigate("/connexion");
      }
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error.message);
      setError(error.message);
    }
  };
  const handleRadioClick = (value) => {
    // Si l'utilisateur clique sur le bouton radio déjà sélectionné, déselectionne-le
    if (radioValue === value) {
      setRadioValue("");
    } else {
      setRadioValue(value);
      // Navigation si "Créer mon exploitation" est sélectionné
      if (value === "createExploitation") {
        // Navigate("../composent_exploitation/FormExploitation");
      }
    }
  };

  return (
    <div className="inscription-page">
      <div className="inscription-div-logo">
        <img src={logo} className="inscription-logo" alt="logo" />
      </div>
      <form className="form-Inscription" onSubmit={signUp}>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div className="inscription-div-input">
          <label className="inscription-label">
            <img src={iconMail} className="inscription-icon" alt="Icon" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
          </label>
          <label className="inscription-label">
            <img src={iconLock} className="inscription-icon" alt="Icon" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mot de passe"
              required
            />
          </label>
          <label className="inscription-label">
            <img src={iconprofil} className="inscription-icon" alt="Icon" />
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Nom d'utilisateur"
              required
            />
          </label>
          <div className="Inscription-radioInput-global">
            <label className="Inscription-radioInput">
              <input
                className="Inscription-radioInput-input"
                type="radio"
                name="exploitationChoice"
                value="selectExploitation"
                checked={radioValue === "selectExploitation"}
                onClick={() => handleRadioClick("selectExploitation")}
                readOnly
              />
              Sélectionnez une exploitation
            </label>
            {radioValue !== "selectExploitation" && (
              <label className="Inscription-radioInput">
                <input
                  className="Inscription-radioInput-input"
                  type="radio"
                  name="exploitationChoice"
                  value="createExploitation"
                  checked={radioValue === "createExploitation"}
                  onClick={() => handleRadioClick("createExploitation")}
                  readOnly
                />
                Créer mon exploitation
              </label>
            )}
          </div>
          {radioValue === "selectExploitation" && (
            <div>
              <label className="InscriptionMenuDel">
                <select
                  className="Inscription-selection-format"
                  onChange={(e) => setExploitation(e.target.value)}
                >
                  <option value="">Sélectionnez une exploitation</option>
                  {exploitations.map((exp) => (
                    <option key={exp}>{exp}</option>
                  ))}
                </select>
              </label>
            </div>
          )}
        </div>
        <div className="inscription-position-buttons">
          <div className="inscription-button-co">
            <button className="button-co" type="submit">
              S'inscrire
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Inscription;
