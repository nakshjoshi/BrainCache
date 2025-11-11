import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_API}/api/auth/me`, { withCredentials: true })
      .then(() => setAuth(true))
      .catch(() => setAuth(false))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!auth) return <Navigate to="/login" />;
  return children;
}