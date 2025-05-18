import "./css/main.css";

import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Layout from "./layout/Layout";
import ProjectPage from "./pages/ProjectPage";

const App = () => {
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
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout colorScheme={colorScheme} changeColor={changeColor} />
          }
        >
          <Route index element={<Home />} />

          <Route path="project/:id" element={<ProjectPage />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
