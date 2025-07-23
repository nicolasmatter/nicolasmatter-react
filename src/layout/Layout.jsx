import React, { useEffect, useState } from "react";

import { Outlet } from "react-router";
import SiteHeader from "../components/SiteHeader";
import WebGLHead from "../components/webgl/WebGLHead";

const Layout = ({ colorScheme, changeColor }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div id="main-container" className="layout">
      <SiteHeader />
      <WebGLHead
        coords={[{ x: mousePosition.x, y: mousePosition.y }]}
        usingColorScheme={colorScheme !== ""}
      />
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
      <Outlet context={{ colorScheme, changeColor }} />
    </div>
  );
};

export default Layout;
