import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HomeHeroFleetPreview } from "./components/preview/HomeHeroFleetPreview";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <HomeHeroFleetPreview />
    </BrowserRouter>
  </React.StrictMode>
);
