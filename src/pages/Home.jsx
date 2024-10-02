// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center text-center">
      <h1 className="text-5xl text-casinoGold mb-8 font-pixel">Ramsch Royal</h1>
      <div>
        <Link
          to="/login"
          className="text-sm font-pixel bg-green-700 text-white border-4 border-dashed border-white font-bold uppercase text-center flex justify-center items-center w-36 h-12 rounded-full shadow-lg transition transform duration-150 hover:scale-110 hover:shadow-xl active:scale-95 active:shadow-md m-8"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Home;
