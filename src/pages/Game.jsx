import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Get gameId from the URL
import { doc, getDoc } from "firebase/firestore"; // Firestore functions
import { db } from "../firebase/firebase"; // Import the Firestore instance

const Game = () => {
  const { gameId } = useParams(); // Retrieve the gameId from the URL
  const [gameData, setGameData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadGame = async () => {
      try {
        const gameRef = doc(db, "games", gameId);
        const gameSnap = await getDoc(gameRef);

        if (gameSnap.exists()) {
          setGameData(gameSnap.data()); // Set game data
          setLoading(false); // Loading finished
        } else {
          setError("Game not found");
          setLoading(false);
        }
      } catch (err) {
        console.error("Error fetching game:", err);
        setError("Failed to load game");
        setLoading(false);
      }
    };

    if (gameId) {
      loadGame(); // Fetch game data if gameId exists
    }
  }, [gameId]);

  if (loading) {
    return <div>Loading game...</div>; // Display loading spinner or text
  }

  if (error) {
    return <div>Error: {error}</div>; // Display error message
  }

  const { players, pot, cards, state, createdAt } = gameData;

  // Format the Firestore timestamp to a readable date
  const createdAtDate = new Date(createdAt.seconds * 1000).toLocaleString();

  return (
    <div>
      <h1>Game ID: {gameId}</h1>
      <div className="game-info">
        <h2>Game State: {state}</h2>
        <p>
          <strong>Pot:</strong> ${pot}
        </p>
        <p>
          <strong>Players:</strong>{" "}
          {players.length > 0 ? players.join(", ") : "No players yet"}
        </p>
        <p>
          <strong>Community Cards:</strong>{" "}
          {cards.length > 0 ? cards.join(", ") : "No cards dealt yet"}
        </p>
        <p>
          <strong>Game Created At:</strong> {createdAtDate}
        </p>
      </div>
      {/* Add more game controls or UI here */}
    </div>
  );
};

export default Game;
