import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../CSS/Navbar.css";

// Importation des logos
import logo1 from "../../image/tracteur.png";
import logo2 from "../../image/VectoriconAjout.svg";
import logo3 from "../../image/VectoriconHistorique.svg";
import logo4 from "../../image/VectoriconSetting.svg";

const Navbar = () => {
  const [activeNavItem, setActiveNavItem] = useState("Matériel");

  // Configuration des éléments de navigation
  const navItems = [
    { name: "Matériel", path: "/home/materiel", icon: logo1 },
    { name: "Ajout", path: "/ajout/notice", icon: logo2 },
    { name: "Historique", path: "/historique/historique", icon: logo3 },
    { name: "Paramètres", path: "/parametres", icon: logo4 },
  ];

  const handleNavItemClick = (item) => {
    setActiveNavItem(item);
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
            onClick={() => handleNavItemClick(item.name)}
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
