import("./Marginals.css");

export const SiteHeader = () => {
	return (
		<>
			<header className="site-header">
				<span className="site-title">nicolasmatter.ch</span>
				<div className="navigation-container">
					<a onClick={() => toggleAbout()} className="navigation-button about-button">
						info
					</a>
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

export const SiteFooter = () => {
	return <>{/* <footer>©nicolasmatter.ch</footer> */}</>;
};

const toggleAbout = () => {
	let main = document.getElementById("main-container");
	main.classList.toggle("overlay-up");
};
