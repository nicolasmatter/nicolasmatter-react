import Navigation from "../components/Navigation";
import { Outlet } from "react-router-dom";
import React from "react";
import WebGLHead from "../components/WebGLHead";

const Layout = () => {
  return (
    <div className="layout">
      <Navigation />
      <WebGLHead
        coords={[{ x: window.innerWidth / 2, y: window.innerHeight / 2 }]}
        usingColorScheme={
          window.matchMedia("(prefers-color-scheme: dark)").matches
        }
      />
      <Outlet />
    </div>
  );
};

export default Layout;
