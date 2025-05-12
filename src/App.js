import React, { useEffect } from "react";
import Home from "./components/Home";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Login from "./components/Login";
import Player from "./components/Player";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        if (location.pathname === "/login") {
          toast.success("Logged in successfully");
          navigate("/");
        }
      } else {
        if (location.pathname !== "/login") {
          toast.info("You have been logged out");
          navigate("/login");
        }
      }
    });

    return () => unsubscribe(); // clean up listener
  }, [navigate, location.pathname]);

  return (
    <div className="min-h-screen bg-black text-white font-roboto">
      <ToastContainer theme="dark" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/player/:id" element={<Player />} />
      </Routes>
    </div>
  );
};

export default App;
