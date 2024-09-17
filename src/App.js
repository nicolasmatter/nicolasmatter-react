import "./css/App.css";
import "./css/Gallery.css";
import "./css/Overlay.css";
import "./css/mediaQuery.css";

import { Gallery } from "./components/Gallery.js";
import React from "react";
import SiteFooter from "./components/SiteFooter.js";
import SiteHeader from "./components/SiteHeader.js";

// Read File

class App extends React.Component {
  render() {
    return (
      <div id="main-container" className="main-container">
        <SiteHeader />
        <Gallery />
        <SiteFooter />
      </div>
    );
  }
}

export default App;
