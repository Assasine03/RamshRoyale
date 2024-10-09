import React from "react";

import { motion } from "framer-motion";
import "../../css/loader.css";
import { div } from "framer-motion/client";

const Loader = () => {
  return (
    /* From Uiverse.io by StealthWorm */
    <div className="flex justify-center">
      <div className="loader">
        <div className="container">
          <div className="carousel">
            <div className="love"></div>
            <div className="love"></div>
            <div className="love"></div>
            <div className="love"></div>
            <div className="love"></div>
            <div className="love"></div>
            <div className="love"></div>
          </div>
        </div>
        <div className="container">
          <div className="carousel">
            <div className="death"></div>
            <div className="death"></div>
            <div className="death"></div>
            <div className="death"></div>
            <div className="death"></div>
            <div className="death"></div>
            <div className="death"></div>
          </div>
        </div>
        <div className="container">
          <div className="carousel">
            <div className="robots"></div>
            <div className="robots"></div>
            <div className="robots"></div>
            <div className="robots"></div>
            <div className="robots"></div>
            <div className="robots"></div>
            <div className="robots"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
