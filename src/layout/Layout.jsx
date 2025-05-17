import React, { useEffect, useState } from "react";

import { Outlet } from "react-router-dom";
import SiteHeader from "../components/SiteHeader";
import WebGLHead from "../components/WebGLHead";

const Layout = () => {
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
        usingColorScheme={false}
      />
      <Outlet />
    </div>
  );
};

export default Layout;
