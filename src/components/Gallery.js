import React from "react";
import client from "../client";
import imageUrlBuilder from "@sanity/image-url";

import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import nico5 from "../models/nico5.glb";
import { Canvas } from "@react-three/fiber";
import loadingGif from "../icons/loading-rippled.gif";
import bigFilterIcon from "../icons/big.svg";
import smallFilterIcon from "../icons/small.svg";
import tileFilterIcon from "../icons/tiles.svg";
//Import Components
import { GalleryItem } from "./GalleryItem.js";
import { Overlay } from "./Overlay.js";

const builder = imageUrlBuilder(client);
var waitToMove = false;
var usingColorScheme = false;

export function urlFor(source) {
	return builder.image(source);
}

export class Gallery extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			filteredProjects: [],
			activeFilters: [],
			activeProject: [],
			activeAbout: [],
			coords: [{ x: 0, y: 0 }],
			galleryView: "list-view",
		};
		this.keyHandler = this.keyHandler.bind(this);
	}
	keyHandler(event) {
		if (event.key === "Escape") {
			resetOverlay();
		}
		if (event.key === "1") {
			this.changeColor("cc-1");
		}
		if (event.key === "2") {
			this.changeColor("cc-2");
		}
		if (event.key === "3") {
			this.changeColor("cc-3");
		}
		if (event.key === "4") {
			this.changeColor("cc-4");
		}
	}
	componentDidMount() {
		document.addEventListener("keydown", this.keyHandler, false);

		let PARAMS = '*[_type=="projects"] | order(year desc)';
		client
			.fetch(PARAMS)
			.then((response) => {
				this.setState({
					data: response,
				});
			})
			.catch((err) => {
				console.log(err);
			});
		PARAMS = '*[_type=="about"]';
		client
			.fetch(PARAMS)
			.then((response) => {
				this.setState({
					activeAbout: response,
				});
			})
			.catch((err) => {
				console.log(err);
			});
	}

	componentWillUnmount() {
		document.removeEventListener("keydown", this.escFunction, false);
	}

	setOverlay = (data) => {
		if (data === undefined) {
		} else {
			this.setState({ activeProject: data });
			toggleOverlay("overlay-left");
		}
	};

	// Function: Change class of body element to switch color scheme
	changeColor = (string) => {
		let reset = false;
		usingColorScheme = true;

		// 0: Check if color scheme is the active one, if yes then just remove all color scheme classes to reset
		if (document.body.classList.contains(string)) {
			reset = true;
			usingColorScheme = false;
		}
		// 1: Remove all color-scheme classes from body
		document.body.className = "";
		// 2: Add string color-scheme class to body
		if (!reset) {
			document.body.className = string;
		}
	};

	filterGallery = (string) => {
		// 1: Get  all objects which have the classname string we are looking for and put them in an array
		let array = document.getElementsByClassName("tag-button");
		let filteredArray = [];
		for (var key in array) {
			let item = array[key];
			if (item.classList && item.classList.contains(string)) {
				filteredArray.push(item);
				break;
			}
		}
		// 2: Check if string is the already active filter, in that case reset filters
		for (var secondKey in this.state.filteredProjects) {
			let item = this.state.filteredProjects[secondKey];
			if (item.classList.contains(string)) {
				this.setState({ filteredProjects: [] });
			}
		}
		this.setState({ filteredProjects: filteredArray });
	};

	checkFilter = (string) => {
		let array = this.state.filteredProjects;
		for (var i = 0; i < array.length; i++) {
			if (array[i].classList.contains(string)) {
				return "highlighted";
			}
		}
		return "";
	};

	setAbout = () => {
		toggleOverlay("overlay-up");
	};

	handleMouseMove = (event) => {
		if (!waitToMove) {
			waitToMove = true;
			setTimeout(() => {
				this.setState({
					coords: [
						{
							x: event.clientX,
							y: event.clientY,
						},
					],
				});
				waitToMove = false;
			}, 17);
		}
	};

	changeGalleryView = (string) => {
		this.setState({ galleryView: string });
	};

	render() {
		let activeFilters = "";
		for (var i = 0; i < this.state.activeFilters.length; i++) {
			activeFilters += " " + this.state.activeFilters[i];
		}
		if (!this.state.data.length) {
			return (
				<>
					<div className="gallery-container" onMouseMove={this.handleMouseMove}>
						<img className="loading-gif" src={loadingGif} alt="loading-gif"></img>
					</div>
					<Canvas
						className="main-canvas"
						onCreated={(state) => {
							state.camera.fov = 30;
						}}
					>
						<ambientLight intensity={0.4} color={0xfcb38c} />
						<pointLight position={[10, 10, 10]} intensity={1} />
						<NicoModel mousePosition={this.state.coords} />
					</Canvas>
				</>
			);
		} else {
			return (
				<>
					<div className="gallery-container" onMouseMove={this.handleMouseMove}>
						{/* Filters for different views of gallery */}
						<div className="filter-container">
							<span className="filter-button" onClick={() => this.changeGalleryView("list")}>
								<img className="svg-filter" src={bigFilterIcon} alt="svg-filter"></img>
							</span>
							<span className="filter-button" onClick={() => this.changeGalleryView("small")}>
								<img className="svg-filter" src={smallFilterIcon} alt="svg-filter"></img>
							</span>
							<span className="filter-button" onClick={() => this.changeGalleryView("tiles")}>
								<img className="svg-filter" src={tileFilterIcon} alt="svg-filter"></img>
							</span>
						</div>
						<div className="color-switch-container">
							<span className="cc-1-button color-switch-button" onClick={() => this.changeColor("cc-1")}>
								1
							</span>
							<span className="cc-2-button color-switch-button" onClick={() => this.changeColor("cc-2")}>
								2
							</span>
							<span className="cc-3-button color-switch-button" onClick={() => this.changeColor("cc-3")}>
								3
							</span>
							<span className="cc-4-button color-switch-button" onClick={() => this.changeColor("cc-4")}>
								4
							</span>
						</div>
						<div className={"gallery " + this.state.galleryView + " " + activeFilters}>
							{this.state.data.map((item) => (
								<GalleryItem
									key={item.projectID}
									data={item}
									setProject={this.setOverlay}
									setFilter={this.filterGallery}
									checkFilter={this.checkFilter}
								/>
							))}
						</div>
					</div>
					<Canvas
						className="main-canvas"
						onCreated={(state) => {
							state.camera.fov = 30;
						}}
					>
						<ambientLight intensity={0.4} color={0xfcb38c} />
						<pointLight position={[10, 10, 10]} intensity={1} />
						<NicoModel mousePosition={this.state.coords} />
					</Canvas>
					<Overlay sliderKey="overlay-right" name="overlay-container overlay-container-right" data={this.state.activeProject} />
					<Overlay
						sliderKey="overlay-bottom"
						name="overlay-container overlay-container-bottom"
						data={this.state.activeAbout[0]}
					/>
				</>
			);
		}
	}
}

// Activate Overlay by giving it a class with the direction it is supposed to move
export const toggleOverlay = (direction) => {
	let main = document.getElementById("main-container");
	main.classList.toggle(direction);
};

// Reset the Overlay to the starting position
export const resetOverlay = () => {
	let main = document.getElementById("main-container");
	main.classList.remove("overlay-left");
	main.classList.remove("overlay-up");
};

export function NicoModel(props) {
	const refMesh = useRef();
	const { nodes, materials } = useGLTF(nico5);
	const rot = [0.7 + props.mousePosition[0].y / window.innerHeight, 0, 0.9 - props.mousePosition[0].x / window.innerWidth];

	return (
		<group {...props} dispose={null}>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.head3d003.geometry}
				material={materials["material_0.003"]}
				rotation={rot}
				position={[1, -1, 0]}
				scale={0.01}
				ref={refMesh}
			>
				{" "}
				{usingColorScheme && <meshStandardMaterial wireframe color="white" />}
			</mesh>
		</group>
	);
}

useGLTF.preload(nico5);
