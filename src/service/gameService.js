import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../firebase/firebase";

const listenToGameUpdates = (gameId, setGameData) => {
  // Check if gameId is valid
  if (!gameId) {
    console.error("Game ID is undefined or invalid");
    return () => {}; // Return an empty function to handle unsubscribe safely
  }

  // Reference to the game document in Firestore
  const gameRef = doc(db, "games", gameId);

  // Listen for real-time updates from Firestore
  const unsubscribe = onSnapshot(
    gameRef,
    (docSnapshot) => {
      if (docSnapshot.exists()) {
        setGameData(docSnapshot.data());
      } else {
        console.error("Game document does not exist.");
        setGameData(null);
      }
    },
    (error) => {
      console.error("Error listening to game updates: ", error);
    }
  );

  // Return unsubscribe function to stop listening when no longer needed
  return unsubscribe;
};

export { listenToGameUpdates };