import React from "react";
import "./App.css";
import { Gallery } from "./components/Gallery.js";
import "./components/Gallery.css";
import "./components/Overlay.css";
import { SiteFooter, SiteHeader } from "./components/Marginals.js";
import "./mediaQuery.css";

// Read File

class App extends React.Component {
  constructor(props) {
    super(props);
  }
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
