import "../css/Marginals.css";

import { Link } from "react-router-dom";
import React from "react";

const SiteHeader = () => {
  const toggleAbout = () => {
    let main = document.getElementById("main-container");
    main.classList.toggle("overlay-up");
  };
  return (
    <>
      <header className="site-header">
        <Link to="/">nicolasmatter.ch</Link>
        <div className="navigation-container">
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <a
            href="https://linktr.ee/nicolasmatter"
            className="navigation-button socials-button"
          >
            Socials
          </a>
        </div>
      </header>
    </>
  );
};
export default SiteHeader;
