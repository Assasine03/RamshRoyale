// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="text-center font-pixel">
      <h1 className="text-5xl text-casinoGold mb-8">Ramsch Royal</h1>
      <div className="space-y-4">
        <h2 className="text-3xl text-casinoGold">Home Page</h2>
        <Link
          to="/login"
          className="text-sm  bg-green-500 text-white border-4 border-dashed border-white font-bold uppercase text-center flex justify-center items-center w-36 h-12 rounded-full shadow-lg transition transform duration-150 hover:scale-110 hover:shadow-xl active:scale-95 active:shadow-md m-8"
        >
          Login
        </Link>

        <Link
          to="/dashboard"
          className="text-sm  bg-green-500 text-white border-4 border-dashed border-white font-bold uppercase text-center flex justify-center items-center w-36 h-12 rounded-full shadow-lg transition transform duration-150 hover:scale-110 hover:shadow-xl active:scale-95 active:shadow-md m-8"
        >
          Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Home;
