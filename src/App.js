import React from "react";
import "./css/App.css";
import { Gallery } from "./components/Gallery.js";
import "./css/Gallery.css";
import "./css/Overlay.css";
import { SiteFooter, SiteHeader } from "./components/Marginals.js";
import "./css/mediaQuery.css";

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
