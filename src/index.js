import React from "react";
import ReactDOM from "react-dom/client";
import "./CSS/index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "./Component_Utilisateurs/AuthContext";
import { useAuth } from "./Component_Utilisateurs/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
