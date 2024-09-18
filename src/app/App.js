import "../css/main.css";

import { GalleryContainer } from "../components/GalleryContainer.js";
import React from "react";
import SiteFooter from "../components/SiteFooter.js";
import SiteHeader from "../components/SiteHeader.js";

// Read File

class App extends React.Component {
  render() {
    return (
      <div id="main-container" className="main-container">
        <SiteHeader />
        <GalleryContainer />
        <SiteFooter />
      </div>
    );
  }
}

export default App;
