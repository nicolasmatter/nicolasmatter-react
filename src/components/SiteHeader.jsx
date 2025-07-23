import "../css/Marginals.css";

import { Link } from "react-router";
import React from "react";

const SiteHeader = () => {
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
