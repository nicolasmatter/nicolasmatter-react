import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import About from "./pages/About";
import Home from "./pages/Home";
import Layout from "./layout/Layout";
import Projects from "./pages/Projects";
import React from "react";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="projects" element={<Projects />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
