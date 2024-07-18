import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../../CSS/Navbar.css";

// Importation des logos
import logo1 from "../../image/tracteur.png";
import logo2 from "../../image/VectoriconAjout.svg";
import logo3 from "../../image/VectoriconHistorique.svg";
import logo4 from "../../image/VectoriconSetting.svg";

const Navbar = () => {
  const location = useLocation();
  const [activeNavItem, setActiveNavItem] = useState("");

  // Configuration des éléments de navigation
  const navItems = [
    { name: "Matériel", path: "/home/materiel", icon: logo1 },
    { name: "Ajout", path: "/ajout/materiel", icon: logo2 },
    { name: "Historique", path: "/historique", icon: logo3 },
    { name: "Paramètres", path: "/parametres", icon: logo4 },
  ];

  // Fonction pour trouver l'élément de navigation actif en fonction de l'URL actuelle
  useEffect(() => {
    const currentPath = location.pathname;
    let activeItem = navItems.find((item) => currentPath.startsWith(item.path));
    if (!activeItem) {
      if (currentPath.includes("/ajout/notice")) {
        activeItem = navItems.find((item) => item.name === "Ajout");
      } else if (currentPath.includes("/ajout/entretien")) {
        activeItem = navItems.find((item) => item.name === "Ajout");
      }
    }
    if (activeItem) {
      setActiveNavItem(activeItem.name);
    }
  }, [location, navItems]);

  const handleNavItemClick = (item) => {
    setActiveNavItem(item.name);
  };

  return (
    <div className="navbar">
      {navItems.map((item) => (
        <Link to={item.path} key={item.name}>
          <div
            className={
              activeNavItem === item.name
                ? "navbar-frame-active"
                : "navbar-frame"
            }
            onClick={() => handleNavItemClick(item)}
          >
            <div className="frameIcons">
              <img
                src={item.icon}
                className="icons-tract"
                alt={`icon-${item.name}`}
              />
            </div>
            <div
              className={
                activeNavItem === item.name
                  ? "navbar-text-active"
                  : "navbar-text"
              }
            >
              {item.name}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Navbar;
