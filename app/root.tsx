import "../src/css/main.css";
import "../src/css/index.css";

import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import React, { useEffect, useState } from "react";

import LayoutComponent from "../src/layout/Layout";

export function Layout({ children }: { children: React.ReactNode }) {
  const [colorScheme, setColorScheme] = useState("");

  useEffect(() => {
    // Check for saved color scheme in localStorage
    const savedScheme = localStorage.getItem("colorScheme");
    if (savedScheme) {
      document.body.className = savedScheme;
      setColorScheme(savedScheme);
    }
  }, []);

  const changeColor = (scheme) => {
    if (document.body.classList.contains(scheme)) {
      document.body.className = "";
      setColorScheme("");
      localStorage.removeItem("colorScheme");
    } else {
      document.body.className = scheme;
      setColorScheme(scheme);
      localStorage.setItem("colorScheme", scheme);
    }
  };
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Nicolas Matter</title>
        <Meta />
        <Links />
      </head>
      <body>
        <LayoutComponent colorScheme={colorScheme} changeColor={changeColor} />
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
