import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom"; // Import useNavigate to navigate programmatically
import { doc, getDoc } from "firebase/firestore"; // Firestore functions to check game existence
import { db } from "../firebase/firebase"; // Import the Firestore instance

const JoinGame = () => {
  const [showGameId, setShowGameId] = useState(false);
  const [gameId, setGameId] = useState(""); // Store the inputted Game ID
  const [error, setError] = useState(null); // To store errors if the game doesn't exist
  const navigate = useNavigate(); // Hook to navigate

  // Function to handle the form submission
  const handleJoinGame = async (e) => {
    e.preventDefault(); // Prevent form from refreshing the page

    if (!gameId) {
      setError("Please enter a valid Game ID");
      return;
    }

    // Check if the game exists in Firestore
    const gameRef = doc(db, "games", gameId);
    const gameSnap = await getDoc(gameRef);

    if (gameSnap.exists()) {
      // If the game exists, navigate to the game page
      navigate(`/game/${gameId}`);
    } else {
      // If the game doesn't exist, show an error message
      setError("Game not found. Please check the Game ID and try again.");
    }
  };

  return (
    <div>
      <form className="grid grid-col-3 gap-4" onSubmit={handleJoinGame}>
        <h1 className="text-4xl text-casinoGold font-pixel">Join Game</h1>
        <div className="relative">
          <input
            className="bg-[#222630] px-4 py-3 outline-none w-full text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040] pr-10"
            type={showGameId ? "text" : "password"} // Toggle visibility
            placeholder="Game ID"
            value={gameId} // Bind the input to gameId state
            onChange={(e) => setGameId(e.target.value)} // Update gameId when the user types
          />
          <button
            type="button"
            onClick={() => setShowGameId(!showGameId)} // Toggle show/hide gameId
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white"
          >
            {showGameId ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </button>
        </div>
        {error && <div className="text-red-500 font-pixel">{error}</div>}{" "}
        {/* Display error if any */}
        <button
          type="submit" // Button triggers form submit
          className="text-sm font-pixel bg-green-700 text-white border-4 border-dashed border-white font-bold uppercase text-center flex justify-center items-center rounded-full shadow-lg transition transform duration-150 hover:scale-110 hover:shadow-xl active:scale-95 active:shadow-md py-2"
        >
          Join Game
        </button>
      </form>
    </div>
  );
};

export default JoinGame;
