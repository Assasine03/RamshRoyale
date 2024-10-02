import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase"; // Ensure you have your Firebase config set up
import { signOut } from "firebase/auth";
import LiquidSideNav from "../components/navbar/NavBar";

import Loader from "../components/loader/Loader";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch the current user from Firebase
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        navigate("/login"); // Redirect to login if not authenticated
      }
      setLoading(false);
    });

    // Clean up the subscription on unmount
    return () => unsubscribe();
  }, [navigate]);

  if (loading) {
    return (
      <>
        <Loader />
      </>
    );
  }

  return (
    <>
      <LiquidSideNav />
      <div className="min-h-screen flex flex-col justify-center items-center p-4">
        <div className="w-full max-w-md text-center">
          <h2 className="text-4xl text-casinoGold  font-pixel">Ramsch Royal</h2>
          <p className="text-lg text-white font-pixel">
            Welcome,{" "}
            <span className="font-pixel ">
              {user.isAnonymous ? "Anonymous User" : user.email}
            </span>
          </p>
          {/**Game Select  */}
          <div className="flex justify-center items-center space-x-4 py-3">
            <button className="text-sm font-pixel bg-green-700 text-white border-4 border-dashed border-white font-bold uppercase text-center flex justify-center items-center rounded-full shadow-lg transition transform duration-150 hover:scale-110 hover:shadow-xl active:scale-95 active:shadow-md py-2 px-4">
              Create Game
            </button>
            <button className="text-sm font-pixel bg-green-700 text-white border-4 border-dashed border-white font-bold uppercase text-center flex justify-center items-center rounded-full shadow-lg transition transform duration-150 hover:scale-110 hover:shadow-xl active:scale-95 active:shadow-md py-2 px-4">
              Join Game
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
