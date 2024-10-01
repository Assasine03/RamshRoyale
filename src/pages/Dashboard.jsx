// components/Dashboard.js
import React from "react";
import { Link } from "react-router-dom";

const Dashboard = ({ user, onLogout }) => {
  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome, {user.isAnonymous ? "Anonymous User" : user.email}</p>
      <button onClick={onLogout}>Logout</button>
      <br />
      <Link to="/">Go to Home</Link>
    </div>
  );
};

export default Dashboard;
