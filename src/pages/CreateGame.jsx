import React, { useState } from "react";
import { FiEye, FiEyeOff, FiCopy } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase/firebase"; // Import the Firestore instance
import { doc, setDoc } from "firebase/firestore"; // Firestore functions to create documents

const CreateGame = () => {
  const [showGameId, setShowGameId] = useState(false);
  const [copied, setCopied] = useState(false);

  const navigate = useNavigate(); // Hook to programmatically navigate

  // Function to generate a random game ID
  const generateGameId = () => {
    return Math.random().toString(36).substr(2, 8).toUpperCase(); // Generate a random alphanumeric string
  };

  const gameId = generateGameId(); // Generate a random game ID

  // Copy game ID to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(gameId);
    setCopied(true); // Show "Copied!" feedback
    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
  };

  // Function to create a new game document in Firestore
  const handleStartGame = async () => {
    const gameRef = doc(db, "games", gameId); // Reference to the 'games' collection with the random gameId

    try {
      // Create the game document in Firestore with initial data
      await setDoc(gameRef, {
        players: [], // Example initial players array
        pot: 0, // Example initial pot value
        cards: [], // Example cards array (empty initially)
        state: "waiting", // Game state, e.g., 'waiting' for players
        createdAt: new Date(), // Timestamp for when the game was created
      });

      console.log("Game created with ID:", gameId);
      // After creating the game, navigate to the game page
      navigate(`/game/${gameId}`);
    } catch (error) {
      console.error("Error creating game:", error);
    }
  };

  return (
    <div className="grid grid-col-3 gap-4">
      <h1 className="text-4xl text-casinoGold font-pixel">Create Game</h1>

      {/* Game ID display */}
      <div className="relative">
        <input
          className="bg-[#222630] px-4 py-3 outline-none w-full text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040] pr-20"
          type={showGameId ? "text" : "password"} // Toggle visibility
          value={gameId} // Display the game ID
          readOnly // Prevent editing the Game ID
        />

        {/* Copy Button */}
        <button
          type="button"
          onClick={handleCopy} // Copy to clipboard
          className="absolute right-12 top-1/2 transform -translate-y-1/2 text-white font-pixel"
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

      <div className="flex justify-center items-center h-36">
        <div className="grid grid-cols-4 grid-rows-2 gap-4">
          {/* Placeholder content */}
          <div className="bg-black bg-opacity-50 w-16 h-16 rounded-lg flex justify-center items-center">
            {/* Content */}
          </div>
          {/* Add additional content here */}
        </div>
      </div>

      {/* Start Game Button */}
      <button
        onClick={handleStartGame} // On click, create the game and navigate
        className="text-sm font-pixel bg-green-700 text-white border-4 border-dashed border-white font-bold uppercase text-center flex justify-center items-center rounded-full shadow-lg transition transform duration-150 hover:scale-110 hover:shadow-xl active:scale-95 active:shadow-md py-2"
      >
        Start Game
      </button>
    </div>
  );
};

export default CreateGame;
