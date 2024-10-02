import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase"; // Ensure you have your Firebase config set up
import { signOut } from "firebase/auth";
import { Nav } from "/src/components/navbar/NavBar";
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

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login"); // Redirect to login after signout
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  if (loading) {
    return (
      <>
        <h2 className="text-4xl text-casinoGold mb-8 font-pixel">
          Ramsch Royal
        </h2>
        <p className="text-lg">Loading user data...</p>
      </>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md text-center">
        <h2 className="text-4xl text-casinoGold  font-pixel">Ramsch Royal</h2>
        <p className="text-lg text-white">
          Welcome,{" "}
          <span className="font-bold">
            {user.isAnonymous ? "Anonymous User" : user.email}
          </span>
        </p>
        {/**Game Select  */}
        <div>
          <button>Create Game</button>
          <button>Join Game</button>
        </div>

        <Loader />

        {/** FOR TESTING */}
        <button
          onClick={handleLogout}
          className="w-full mt-4 bg-red-500 text-white py-2 rounded-md shadow-md hover:bg-red-600 transition duration-200"
        >
          Logout
        </button>
      </div>

      {/* Include Nav */}
      <Nav />
    </div>
  );
};

export default Dashboard;
