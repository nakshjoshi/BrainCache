// src/routes/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import History from "../pages/History";
import Profile from "../pages/Profile"; 
import Landing from "../pages/Landing";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/home" element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      } />
      <Route path="/" element={<Landing />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />


    </Routes>
  );
}
