import React, { useState } from "react";
import { FiEye, FiEyeOff, FiCopy } from "react-icons/fi"; // Icons for better UX

const CreateGame = () => {
  const [showGameId, setShowGameId] = useState(false); // Manage visibility of Game Id
  const [copied, setCopied] = useState(false); // Manage copy button feedback

  const gameId = "ABCD1234"; // Example Game ID (you can generate this dynamically)

  // Function to copy the game ID to the clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(gameId);
    setCopied(true); // Show "Copied!" feedback
    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
  };

  return (
    <div className="grid grid-col-3 gap-4">
      <h1 className="text-4xl text-casinoGold font-pixel">Create Game</h1>

      {/* Game ID display */}
      <div className="relative">
        <input
          className="bg-[#222630] px-4 py-3 outline-none w-full text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040] pr-20" // Adjust for buttons
          type={showGameId ? "text" : "password"} // Toggle visibility
          value={gameId} // Display the game ID
          readOnly // Prevent editing the Game ID
        />

        {/* Copy Button */}
        <button
          type="button"
          onClick={handleCopy} // Copy to clipboard
          className="absolute right-12 top-1/2 transform -translate-y-1/2 text-white font-pixel "
        >
          {copied ? "Copied!" : <FiCopy size={20} />} {/* Show feedback */}
        </button>
        {/* Reveal Button */}
        <button
          type="button"
          onClick={() => setShowGameId(!showGameId)} // Toggle visibility
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white"
        >
          {showGameId ? <FiEyeOff size={20} /> : <FiEye size={20} />}{" "}
          {/* Toggle icon */}
        </button>
      </div>
      <div className="grid grid-cols-4 grid-rows-2 gap-4 justify-center items-center">
        <div className="bg-black bg-opacity-50 w-16 h-16 rounded-lg flex justify-center items-center">
          {/* Content inside each square */}
        </div>
        <div className="bg-black bg-opacity-50 w-16 h-16 rounded-lg flex justify-center items-center">
          {/* Content inside each square */}
        </div>
        <div className="bg-black bg-opacity-50 w-16 h-16 rounded-lg flex justify-center items-center">
          {/* Content inside each square */}
        </div>
        <div className="bg-black bg-opacity-50 w-16 h-16 rounded-lg flex justify-center items-center">
          {/* Content inside each square */}
        </div>
        <div className="bg-black bg-opacity-50 w-16 h-16 rounded-lg flex justify-center items-center">
          {/* Content inside each square */}
        </div>
        <div className="bg-black bg-opacity-50 w-16 h-16 rounded-lg flex justify-center items-center">
          {/* Content inside each square */}
        </div>
        <div className="bg-black bg-opacity-50 w-16 h-16 rounded-lg flex justify-center items-center">
          {/* Content inside each square */}
        </div>
        <div className="bg-black bg-opacity-50 w-16 h-16 rounded-lg flex justify-center items-center">
          {/* Content inside each square */}
        </div>
      </div>

      <button className="text-sm font-pixel bg-green-700 text-white border-4 border-dashed border-white font-bold uppercase text-center flex justify-center items-center rounded-full shadow-lg transition transform duration-150 hover:scale-110 hover:shadow-xl active:scale-95 active:shadow-md py-2">
        Start Game
      </button>
    </div>
  );
};

export default CreateGame;
