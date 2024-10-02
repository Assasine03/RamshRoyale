import React from "react";
import { FaHeart } from "react-icons/fa";
import { BsFillSuitSpadeFill } from "react-icons/bs";
import { GiClubs } from "react-icons/gi";
import "/src/css/loader.css";

const icons = [
  { IconComponent: FaHeart, className: "love" },
  { IconComponent: BsFillSuitSpadeFill, className: "death" },
  { IconComponent: GiClubs, className: "robots" },
];

const Loader = () => {
  return (
    <div className="loader-wrapper">
      <div className="loader">
        {icons.map(({ IconComponent, className }, index) => (
          <div className="container" key={index}>
            <div className="carousel">
              {[...Array(7)].map((_, i) => (
                <IconComponent key={i} className={`icon ${className}`} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loader;
