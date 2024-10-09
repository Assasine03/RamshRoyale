import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Correct import for useParams
import { doc, getDoc, updateDoc } from "firebase/firestore"; // Firestore functions
import { db } from "../firebase/firebase"; // Import the Firestore instance

// Utility function to create a deck of cards with correct image filenames
const createDeck = () => {
  const suits = ["P", "H", "D", "C"]; // P = Spades, H = Hearts, D = Diamonds, C = Clubs
  const values = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
    "A",
  ];
  const deck = [];
  for (let suit of suits) {
    for (let value of values) {
      // Correct image path format: X-X.png (e.g., 2-P.png, A-H.png)
      deck.push({
        value,
        suit,
        image: `assets/cards/card_deck_3/light/${value}-${suit}.png`, // No leading slash
      });
    }
  }
  return deck;
};

const shuffleDeck = (deck) => {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
};

const Game = () => {
  const { gameId } = useParams(); // Retrieve the gameId from the URL
  const [gameData, setGameData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deck, setDeck] = useState([]); // Hold the shuffled deck
  const [communityCards, setCommunityCards] = useState([]); // Hold community cards
  const [playerHands, setPlayerHands] = useState({}); // Hold each player's cards
  const [gameState, setGameState] = useState("pre-flop"); // Hold current game stage

  useEffect(() => {
    const loadGame = async () => {
      try {
        const gameRef = doc(db, "games", gameId);
        const gameSnap = await getDoc(gameRef);

        if (gameSnap.exists()) {
          const gameData = gameSnap.data();
          setGameData(gameData);
          if (!gameData.deck) {
            const newDeck = shuffleDeck(createDeck());
            setDeck(newDeck);
            await updateDoc(gameRef, { deck: newDeck });
          } else {
            setDeck(gameData.deck);
          }
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
      loadGame();
    }
  }, [gameId]);

  const dealCards = async () => {
    if (!deck.length) return;

    const newPlayerHands = {};
    const players = gameData.players || [];

    players.forEach((player) => {
      newPlayerHands[player] = [deck.pop(), deck.pop()]; // Deal two cards to each player
    });

    setPlayerHands(newPlayerHands);
    setDeck([...deck]);

    await updateDoc(doc(db, "games", gameId), {
      playerHands: newPlayerHands,
      deck: deck,
    });
  };

  const dealCommunityCard = async () => {
    if (!deck.length) return;

    // Deal community card based on current state
    const newCommunityCards = [...communityCards];
    if (gameState === "pre-flop") {
      newCommunityCards.push(deck.pop(), deck.pop(), deck.pop()); // Flop (3 cards)
      setGameState("flop");
    } else if (gameState === "flop") {
      newCommunityCards.push(deck.pop()); // Turn (1 card)
      setGameState("turn");
    } else if (gameState === "turn") {
      newCommunityCards.push(deck.pop()); // River (1 card)
      setGameState("river");
    }

    setCommunityCards(newCommunityCards);
    setDeck([...deck]);

    await updateDoc(doc(db, "games", gameId), {
      communityCards: newCommunityCards,
      deck: deck,
      gameState: gameState,
    });
  };

  if (loading) {
    return <div>Loading game...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const { players, pot, state, createdAt } = gameData;

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
          <strong>Community Cards:</strong>
          {communityCards.length > 0
            ? communityCards.map((card, index) => (
                <img
                  key={index}
                  src={card.image}
                  alt={`${card.value}-${card.suit}`}
                  width="50"
                />
              ))
            : "No cards dealt yet"}
        </p>
        <p>
          <strong>Game Created At:</strong> {createdAtDate}
        </p>
      </div>

      <button
        onClick={dealCards}
        disabled={Object.keys(playerHands).length > 0}
      >
        Deal Player Hands
      </button>

      <button onClick={dealCommunityCard} disabled={communityCards.length >= 5}>
        Deal Community Card
      </button>

      <div className="player-hands">
        {Object.keys(playerHands).map((player) => (
          <div key={player}>
            <p>
              <strong>{player}'s Hand:</strong>
            </p>
            {playerHands[player].map((card, index) => (
              <img
                key={index}
                src={card.image}
                alt={`${card.value}-${card.suit}`}
                width="50"
              />
            ))}
          </div>
        ))}
      </div>

      {/* Additional actions like betting, folding, etc., would go here */}
    </div>
  );
};

export default Game;
