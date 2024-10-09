import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";
import { signOutUser } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import ProfileIcon from "../user/IconGen";

const LiquidSideNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Handle Logout and redirect to the login page
  const handleLogout = async () => {
    try {
      await signOutUser(); // Call the Firebase sign-out function
      console.log("User logged out successfully");
      navigate("/login"); // Redirect to the login page after logout
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <>
      {/* Button to open the navigation */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            key="menuButton"
            onClick={() => setIsOpen(true)}
            className="fixed top-8 right-8 z-50 bg-indigo-500 text-white text-3xl rounded-full shadow-lg hover:bg-indigo-400 transition-colors"
            style={{ padding: 0, width: 60, height: 60 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ProfileIcon size={60} clickable={true} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* The sliding navigation */}
      <Nav isOpen={isOpen} setIsOpen={setIsOpen} onLogout={handleLogout} />
    </>
  );
};

const Nav = ({ isOpen, setIsOpen, onLogout }) => {
  return (
    <motion.nav
      className="fixed top-0 bottom-0 w-screen bg-white shadow-lg z-40"
      animate={isOpen ? "open" : "closed"}
      variants={navVariants}
      initial="closed"
    >
      {/* Close button */}
      <motion.button
        className="text-3xl bg-white text-black hover:text-indigo-500 border-[1px] border-transparent hover:border-indigo-500 transition-colors rounded-full absolute top-8 right-8"
        style={{
          padding: 0,
          width: 60,
          height: 60,
          display: "flex", // Use flexbox
          justifyContent: "center", // Center horizontally
          alignItems: "center", // Center vertically
        }}
        whileHover={{ rotate: "180deg" }}
        onClick={() => setIsOpen(false)}
        whileTap={{ scale: 0.9 }}
      >
        <FiX size={40} />
      </motion.button>

      {/* Navigation Links */}
      <motion.div
        variants={linkWrapperVariants}
        className="flex flex-col gap-8 absolute bottom-20 left-10"
      >
        <NavLink text="Logout" onClick={onLogout} />{" "}
        {/* Logout link with sign out */}
      </motion.div>
    </motion.nav>
  );
};

// Reusable NavLink component
const NavLink = ({ text, onClick }) => {
  return (
    <motion.a
      className="inline-block z-10 text-slate-800 font-black text-5xl hover:text-indigo-500 transition-colors"
      onClick={onClick}
      rel="nofollow"
      href="#"
    >
      {text}
    </motion.a>
  );
};

export default LiquidSideNav;

const navVariants = {
  open: {
    x: "0%",
    borderTopLeftRadius: "0vw",
    borderBottomLeftRadius: "0vw",
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
  closed: {
    x: "100%",
    borderTopLeftRadius: "50vw",
    borderBottomLeftRadius: "50vw",
    opacity: 0,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

const linkWrapperVariants = {
  open: {
    transition: {
      staggerChildren: 0.1,
    },
  },
  closed: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const navLinkVariants = {
  open: { x: 0 },
  closed: { x: 25 },
};
