import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Signup from "./pages/signup.jsx";
import Home from "./pages/home.jsx";
import UpdateProfile from "./pages/updateProfile.jsx";
import MyState from "./context/MyState.js";
import ProtectedRoute from "./protectedRoute/protectedRoute.jsx";

function App() {
  // const isAuthenticated = localStorage.getItem("token") !== null;
  const [isAuthenticated, setAuthenticated] = useState(false);
  const location = useLocation();

  function checkAuth() {
    if (localStorage.getItem("token") !== null) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  }

  useEffect(() => {
    checkAuth();
  }, [location.pathname]);

  return (
    <MyState>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/updateProfile"
          element={
            <ProtectedRoute>
              <UpdateProfile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </MyState>
  );
}

export default App;
