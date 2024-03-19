import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./CSS/App.css";

import Connexion from "./Component_Utilisateurs/Connexion";
import Inscription from "./Component_Utilisateurs/Inscription";
import Home from "./Pages/Home";
import Ajout from "./Pages/Ajout";
import Historique from "./Pages/Historique";
import Parametres from "./Pages/Parametres";
import { useAuth } from "./Component_Utilisateurs/AuthContext";
import Layout from "./Component_App/Layout";
import Exploitation from "./composant_exploitation/Exploitation";
import Notice from "./Pages/Notice";

function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/connexion" />;
}

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/connexion" element={<Connexion />} />
          <Route path="/inscription" element={<Inscription />} />
          <Route path="/exploitation" element={<Exploitation />} />
          <Route
            path="/home/*"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ajout/*"
            element={
              <ProtectedRoute>
                <Ajout />
              </ProtectedRoute>
            }
          />
          <Route
            path="/historique/*"
            element={
              <ProtectedRoute>
                <Historique />
              </ProtectedRoute>
            }
          />
          <Route
            path="/parametres/*"
            element={
              <ProtectedRoute>
                <Parametres />
              </ProtectedRoute>
            }
          />
          <Route
            path="/notice"
            element={
              <ProtectedRoute>
                <Notice />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
