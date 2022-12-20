import React from "react";
import buttonImage from "../icons/cross.svg";
import { PortableText } from "@portabletext/react";
import { resetOverlay } from "./Gallery";
//Components
import { SlickGallery } from "./SlickGallery";

export class Overlay extends React.Component {
	render() {
		let ref = this.props.data;
		if (ref) {
			if (ref.images) {
				return (
					<div className={this.props.name}>
						<div className="overlay-content" id="overlay-parent">
							<SlickGallery key={this.props.sliderKey} imageList={ref.images} />
							<OverlayText title={ref.name} year={ref.year} portableText={ref.portableText} headline={ref.headline} />
							<OverlayButton />
						</div>
					</div>
				);
			} else {
				return (
					<div className={this.props.name}>
						<div className="overlay-content" id="overlay-parent"></div>
					</div>
				);
			}
		}
	}
}

const OverlayButton = (props) => {
	return (
		<button className="overlay-button" onClick={resetOverlay}>
			close<div className="overlay-button-x" style={{ backgroundImage: `url(${buttonImage})` }}></div>
		</button>
	);
};

const OverlayText = (props) => {
	return (
		<>
			<div className="overlay-text">
				<h1>{props.title}</h1>
				<h2>{props.year}</h2>
				<h3>{props.headline}</h3>
				<span>
					<PortableText value={props.portableText} />
				</span>
			</div>
		</>
	);
};
