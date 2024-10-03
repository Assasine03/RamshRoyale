import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

const JoinGame = () => {
  const [showGameId, setShowGameId] = useState(false);

  return (
    <div>
      <form className="grid grid-col-3 gap-4" action="">
        <h1 className="text-4xl text-casinoGold font-pixel">Join Game</h1>
        <div className="relative">
          <input
            className="bg-[#222630] px-4 py-3 outline-none w-full text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040] pr-10" // Add padding-right for the button
            type={showGameId ? "text" : "password"}
            placeholder="Game Id"
          />
          <button
            type="button"
            onClick={() => setShowGameId(!showGameId)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white"
          >
            {showGameId ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </button>
        </div>
        <button className="text-sm font-pixel bg-green-700 text-white border-4 border-dashed border-white font-bold uppercase text-center flex justify-center items-center rounded-full shadow-lg transition transform duration-150 hover:scale-110 hover:shadow-xl active:scale-95 active:shadow-md py-2">
          Join Game
        </button>
      </form>
    </div>
  );
};

export default JoinGame;
