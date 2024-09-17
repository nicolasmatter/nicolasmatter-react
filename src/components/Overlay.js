import { PortableText } from "@portabletext/react";
import React from "react";
//Components
import { SlickGallery } from "./SlickGallery";
import buttonImage from "../icons/return.svg";
import { resetOverlay } from "./Gallery";

export class Overlay extends React.Component {
  render() {
    let ref = this.props.data;
    if (ref) {
      if (ref.images) {
        return (
          <div className={this.props.name}>
            <OverlayButton />
            <div className="overlay-content" id="overlay-parent">
              <SlickGallery key={this.props.sliderKey} imageList={ref.images} />
              <OverlayText
                title={ref.name}
                year={ref.year}
                portableText={ref.portableText}
                headline={ref.headline}
              />
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
    <div>
      <button className="overlay-button" onClick={resetOverlay}>
        <div
          className="overlay-button-x"
          style={{ backgroundImage: `url(${buttonImage})` }}
        ></div>
      </button>
    </div>
  );
};

const OverlayText = (props) => {
  return (
    <>
      <div className="overlay-text">
        <h1>{props.title}</h1>
        <h2>{props.year}</h2>
        <h3>{props.headline}</h3>
        <span className="text-red">
          <PortableText value={props.portableText} />
        </span>
      </div>
    </>
  );
};
