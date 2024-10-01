// App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom"; // Import Routes and Route for defining paths
import Home from "./pages/Home"; // Home component (Casino themed)
import Login from "./components/Login"; // Login component
import Dashboard from "./pages/Dashboard"; // Dashboard component (Protected)

const App = () => {
  return (
    <div className="App">
      {/* Define routes for your application */}
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home route */}
        <Route path="/login" element={<Login />} /> {/* Login route */}
        <Route path="/dashboard" element={<Dashboard />} />{" "}
        {/* Protected Dashboard route */}
      </Routes>

      <img src="" alt="" />
    </div>
  );
};

export default App;
