import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";


// Lazy load the components
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Signup = lazy(() => import("./pages/Signup"))

const App = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Background Image */}
      <img
        src="/images/table.png"
        alt="Casino Table Background"
        className="absolute inset-0 w-full h-full object-contain z-0"
      />

      {/* Overlay Content */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
        {/* Wrap Routes in Suspense to show a fallback while components are loading */}
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
};

export default App;
