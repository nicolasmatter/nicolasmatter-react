import React, { useEffect, useState } from "react";

import { GalleryItem } from "./GalleryItem";
import bigFilterIcon from "../assets/icons/big.svg";
import client from "../client.js";
import imageUrlBuilder from "@sanity/image-url";
import loadingGif from "../assets/icons/loading-rippled.gif";
import smallFilterIcon from "../assets/icons/small.svg";
import tileFilterIcon from "../assets/icons/tiles.svg";

const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder
    .image(source)
    .width(1920) // Request full HD width
    .quality(90) // High quality JPEG
    .auto("format"); // Automatically choose best format (WebP if supported)
}

export const GalleryContainer = () => {
  const [data, setData] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);

  const [galleryView, setGalleryView] = useState("list-view");

  useEffect(() => {
    let PARAMS = '*[_type=="projects"] | order(year desc)';
    client
      .fetch(PARAMS)
      .then((response) => {
        setData(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const filterGallery = (string) => {
    let array = document.getElementsByClassName("tag-button");
    let filteredArray = [...filteredProjects];

    for (var key in array) {
      let item = array[key];
      if (
        item.classList &&
        item.classList.contains(string) &&
        !item.classList.contains("highlighted")
      ) {
        filteredArray.push(item);
      }
      if (
        item.classList &&
        item.classList.contains(string) &&
        item.classList.contains("highlighted")
      ) {
        var index = filteredArray.indexOf(item);
        if (index !== -1) {
          filteredArray.splice(index, 1);
        }
      }
    }
    setFilteredProjects(filteredArray);
  };

  const showHideGalleryItem = (string) => {
    let id = "gallery-item-" + string;
    let element = document.getElementById(id);
    if (filteredProjects.length > 0 && element) {
      for (var i = 0; i < filteredProjects.length; i++) {
        if (filteredProjects[i].classList.contains(string)) {
          return "";
        }
      }
      return "hidden";
    } else return "";
  };

  const checkFilter = (string) => {
    let array = filteredProjects;
    for (var i = 0; i < array.length; i++) {
      if (array[i].classList.contains(string)) {
        return "highlighted";
      }
    }
    return "";
  };

  return (
    <>
      <div className="gallery-container">
        {!data.length && (
          <>
            <img
              className="loading-gif"
              src={loadingGif}
              alt="loading-gif"
            ></img>
          </>
        )}

        <div className="filter-container">
          <span
            className="filter-button"
            onClick={() => setGalleryView("list")}
          >
            <img
              className="svg-filter"
              src={bigFilterIcon}
              alt="svg-filter"
            ></img>
          </span>
          <span
            className="filter-button"
            onClick={() => setGalleryView("small")}
          >
            <img
              className="svg-filter"
              src={smallFilterIcon}
              alt="svg-filter"
            ></img>
          </span>
          <span
            className="filter-button"
            onClick={() => setGalleryView("tiles")}
          >
            <img
              className="svg-filter"
              src={tileFilterIcon}
              alt="svg-filter"
            ></img>
          </span>
        </div>

        <div className={"gallery " + galleryView + " "}>
          {data.map((item) => (
            <GalleryItem
              key={item.projectID}
              data={item}
              setFilter={filterGallery}
              checkFilter={checkFilter}
              showHideGalleryItem={showHideGalleryItem}
            />
          ))}
        </div>
      </div>
    </>
  );
};
