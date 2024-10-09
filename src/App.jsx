import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Loader from "./components/loader/Loader";


// Lazy load the components
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Signup = lazy(() => import("./pages/Signup"));
const JoinGame = lazy(() => import("./pages/JoinGame"));
const CreateGame = lazy(() => import("./pages/CreateGame"));
const Game = lazy(() => import("./pages/Game"));

const App = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Background Image */}
      <img
        src="/images/table.png"
        alt="Casino Table Background"
        className="absolute inset-0 w-full h-full object-contain z-0 px-20 xl:px-80"
      />

      {/* Overlay Content */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
        {/* Wrap Routes in Suspense to show a fallback while components are loading */}
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/joingame" element={<JoinGame />} />
            <Route path="/creategame" element={<CreateGame />} />
            <Route path="/game/:gameId" element={<Game />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
};

export default App;
