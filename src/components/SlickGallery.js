import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { urlFor } from "./Gallery.js";
import "../css/SlickGallery.css";

export class SlickGallery extends React.Component {
	render() {
		var settings = {
			dots: false,
			infinite: true,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: true,
			autoplaySpeed: 3000,
		};

		if (this.props.imageList) {
			return (
				<Slider key="slick-slider" className="slick" {...settings}>
					{this.props.imageList.map((item) => (
						<SliderItem name={item.name} key={item} url={urlFor(item)} text={item.text} />
					))}
				</Slider>
			);
		} else {
			return (
				<Slider key="placeholder-slider" className="slick" {...settings}>
					<SliderItem name="placeholder" key="placeholder-slider" url="https://nicolasmatter.ch/pbp/img/1080_ich.webp" />
				</Slider>
			);
		}
	}
}

const SliderItem = (props) => {
	return (
		<>
			<div key={props.key} className="slickGallery-item">
				<img src={props.url} alt="slider-item" />
				<span>{props.text}</span>
			</div>
		</>
	);
};
