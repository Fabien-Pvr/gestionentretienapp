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

const Inscription = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [exploitations, setExploitations] = useState([]);
  const [exploitation, setExploitation] = useState("");
  const [error, setError] = useState("");
  const [userId, setUserId] = useState("");

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

  return (
    <div>
      <h2>Inscription</h2>
      <form onSubmit={signUp}>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mot de passe"
          required
        />
        <input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="Nom d'utilisateur"
          required
        />
        <div>
          <label className="FormMenuDel">
            <select
              className="NoticeForm-selection-format"
              // value={modele}
              onChange={(e) => setExploitation(e.target.value)}
            >
              <option value="">Sélectionnez un modèle</option>
              {exploitations.map((exp) => (
                <option
                  className="NoticeForm-option-selection"
                  key={exp}
                  // value={m}
                >
                  {exp}
                </option>
              ))}
            </select>
          </label>
        </div>
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
};

export default Inscription;
