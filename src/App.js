import Navbar from "./layouts/Navbar";
import Footer from "./layouts/Footer";
import "./styles/index.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { routeConstants } from "./constants/routeConstants";

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        {Object.values(routeConstants).map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
