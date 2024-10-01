// CoinButton.jsx
import React from "react";
import "../../scss/button.scss";

const ChipButton = ({ onClick, label }) => {
  return (
    <button className="chip-button" onClick={onClick}>
      <span>{label}</span>
    </button>
  );
};

export default ChipButton;
