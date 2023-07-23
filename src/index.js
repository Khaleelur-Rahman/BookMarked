import React from "react";
import { createRoot } from "react-dom/client";
import "./assets/index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify"; //Displays popup notificationas
import "react-toastify/dist/ReactToastify.css";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <BrowserRouter>
    <App />
    <ToastContainer />
  </BrowserRouter>
);
