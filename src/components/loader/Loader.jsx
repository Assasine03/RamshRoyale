import React from "react";
import { motion } from "framer-motion";
import {
  BsFillSuitClubFill,
  BsFillSuitDiamondFill,
  BsFillSuitHeartFill,
} from "react-icons/bs";
import { GiCardJoker } from "react-icons/gi";
import { IoDiamond } from "react-icons/io5";
import { PiCherriesFill } from "react-icons/pi";
import { GiSpades } from "react-icons/gi";
import "../../css/loader.css";

// Slot items with specific colors
const slotItems = [
  { icon: <BsFillSuitClubFill color="#1E90FF" />, key: "club" }, // Blue
  { icon: <BsFillSuitDiamondFill color="#FF4500" />, key: "diamond" }, // Orange
  { icon: <BsFillSuitHeartFill color="#FF0000" />, key: "heart" }, // Red
  { icon: <GiSpades color="#000000" />, key: "spade" }, // Black
  { icon: <GiCardJoker color="#FFD700" />, key: "joker" }, // Gold
  { icon: <IoDiamond color="#00BFFF" />, key: "diamond-alt" }, // Blue
  { icon: <PiCherriesFill color="#FF1493" />, key: "cherries" }, // Pink
];

// Reusable Reel Component
const Reel = ({ reverse = false }) => {
  // Duplicate the slot items to ensure a smooth transition
  const reelItems = [...slotItems, ...slotItems]; // Ensure enough icons for smooth looping

  return (
    <motion.div
      className="reel"
      initial={{ y: 0 }} // Start position
      animate={{ y: reverse ? 260 : -260 }} // Moves reels up or down
      transition={{
        repeat: Infinity,
        duration: 3, // Adjust duration for smoother movement
        ease: "linear", // Linear for continuous movement
      }}
    >
      {reelItems.map((item, index) => (
        <div key={`${item.key}-${index}`} className="slot">
          {item.icon}
        </div>
      ))}
    </motion.div>
  );
};

const Loader = () => {
  return (
    <div className="slot-machine-container">
      <div className="slot-machine-loader">
        <Reel /> {/* Left Reel */}
        <Reel reverse={true} /> {/* Middle Reel, reverse direction */}
        <Reel /> {/* Right Reel */}
      </div>
    </div>
  );
};

export default Loader;
