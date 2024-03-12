import React from "react";
import { useLocation } from "react-router-dom";
import Head from "./Head";
import Navbar from "./Footer";

const Layout = ({ children }) => {
  const location = useLocation();
  const showHeaderAndFooter =
    location.pathname !== "/connexion" &&
    location.pathname !== "/inscription" &&
    location.pathname !== "/exploitation";

  return (
    <div className="App">
      {showHeaderAndFooter && (
        <header className="App-header">
          <Head />
        </header>
      )}
      <main>{children}</main>
      {showHeaderAndFooter && (
        <footer>
          <Navbar />
        </footer>
      )}
    </div>
  );
};

export default Layout;
