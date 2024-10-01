// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="text-center">
      <h1 className="text-5xl text-casinoGold font-pixel mb-8">
        Welcome to Pixel Casino
      </h1>
      <div className="space-y-4">
        <h2 className="text-3xl text-casinoGold">Home Page</h2>
        <Link to="/login" className="text-lg text-casinoGold underline block">
          Go to Login
        </Link>
        <Link
          to="/dashboard"
          className="text-lg text-casinoGold underline block"
        >
          Go to Dashboard (Protected)
        </Link>
      </div>
    </div>
  );
};

export default Home;
