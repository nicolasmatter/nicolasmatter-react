import "../css/Marginals.css";

import React from "react";

const SiteHeader = () => {
	const toggleAbout = () => {
		let main = document.getElementById("main-container");
		main.classList.toggle("overlay-up");
	};
	return (
		<>
			<header className="site-header">
				<span className="site-title">nicolasmatter.ch</span>
				<div className="navigation-container">
					<span onClick={() => toggleAbout()} className="navigation-button about-button">
						info
					</span>
					<a href="mailto:hello@nicolasmatter.ch" className="navigation-button contact-button">
						contact
					</a>
					<a href="https://linktr.ee/nicolasmatter" className="navigation-button socials-button">
						socials
					</a>
				</div>
			</header>
		</>
	);
};
export default SiteHeader;