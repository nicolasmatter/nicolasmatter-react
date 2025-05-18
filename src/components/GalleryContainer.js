import React, { useEffect, useState } from "react";

import { GalleryItem } from "./GalleryItem.js";
import bigFilterIcon from "../assets/icons/big.svg";
import client from "../client.js";
import imageUrlBuilder from "@sanity/image-url";
import loadingGif from "../assets/icons/loading-rippled.gif";
import smallFilterIcon from "../assets/icons/small.svg";
import tileFilterIcon from "../assets/icons/tiles.svg";
import { useOutletContext } from "react-router-dom";

const builder = imageUrlBuilder(client);
var waitToMove = false;

export function urlFor(source) {
  return builder.image(source);
}

export const GalleryContainer = () => {
  const { colorScheme, changeColor } = useOutletContext();
  const [data, setData] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [activeFilters, setActiveFilters] = useState([]);
  const [activeProject, setActiveProject] = useState([]);
  const [activeAbout, setActiveAbout] = useState([]);
  const [coords, setCoords] = useState([{ x: 0, y: 0 }]);
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
    PARAMS = '*[_type=="about"]';
    client
      .fetch(PARAMS)
      .then((response) => {
        setActiveAbout(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const setOverlay = (data) => {
    if (data !== undefined) {
      setActiveProject(data);
    }
  };

  const handleMouseMove = (event) => {
    if (!waitToMove) {
      waitToMove = true;
      setTimeout(() => {
        setCoords([{ x: event.clientX, y: event.clientY }]);
        waitToMove = false;
      }, 17);
    }
  };

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

  let activeFiltersString = "";
  for (var i = 0; i < activeFilters.length; i++) {
    activeFiltersString += " " + activeFilters[i];
  }

  return (
    <>
      <div className="gallery-container" onMouseMove={handleMouseMove}>
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
        <div className="color-switch-container">
          <span
            className="cc-1-button color-switch-button"
            onClick={() => changeColor("cc-1")}
          >
            1
          </span>
          <span
            className="cc-2-button color-switch-button"
            onClick={() => changeColor("cc-2")}
          >
            2
          </span>
          <span
            className="cc-3-button color-switch-button"
            onClick={() => changeColor("cc-3")}
          >
            3
          </span>
          <span
            className="cc-4-button color-switch-button"
            onClick={() => changeColor("cc-4")}
          >
            4
          </span>
        </div>
        <div className={"gallery " + galleryView + " " + activeFiltersString}>
          {data.map((item) => (
            <GalleryItem
              key={item.projectID}
              data={item}
              setProject={setOverlay}
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
