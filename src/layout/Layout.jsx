import React, { useEffect, useState } from "react";

import Navigation from "../components/Navigation";
import { Outlet } from "react-router-dom";
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
    <div className="layout">
      <Navigation />
      <WebGLHead
        coords={[{ x: mousePosition.x, y: mousePosition.y }]}
        usingColorScheme={
          window.matchMedia("(prefers-color-scheme: dark)").matches
        }
      />
      <Outlet />
    </div>
  );
};

export default Layout;
