import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_API}/api/auth/logout`, {}, { withCredentials: true });
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (err) {
      toast.error("Logout failed. Try again.");
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_API}/api/auth/me`, {
          withCredentials: true,
        });
        setUser(res.data);
      } catch {
        setUser(null);
      }
    };
    fetchUser();
    setMenuOpen(false); // close menu on route change
  }, [location]);

  return (
    <nav className="absolute top-0 left-0 w-full z-50 bg-transparent">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="flex items-center gap-2 text-3xl font-extrabold bg-gradient-to-r from-pink-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent animate-gradient-x"
        >
          <span className="inline-block animate-bounce">💡</span>
          BrainCache
        </Link>
        <button
          className="md:hidden flex flex-col gap-1 focus:outline-none"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span className="w-7 h-1 bg-indigo-400 rounded transition-all"></span>
          <span className="w-7 h-1 bg-pink-400 rounded transition-all"></span>
          <span className="w-7 h-1 bg-blue-400 rounded transition-all"></span>
        </button>
        <div
          className={`${
            menuOpen ? "flex" : "hidden"
          } absolute top-full left-0 w-full bg-gradient-to-br from-indigo-900 via-indigo-700 to-indigo-500 md:static md:flex md:bg-none md:w-auto md:items-center transition-all duration-300`}
        >
          <div className="flex flex-col md:flex-row md:gap-8 gap-4 items-center py-6 md:py-0 w-full md:w-auto">
            {user ? (
              <>
                <Link
                  to="/"
                  className="text-lg font-semibold text-white hover:scale-110 transition-transform hover:text-pink-300"
                  onClick={() => setMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/history"
                  className="text-lg font-semibold text-white hover:scale-110 transition-transform hover:text-blue-300"
                  onClick={() => setMenuOpen(false)}
                >
                  History
                </Link>
                {/* Profile link removed, now in username bubble */}
                <button
                  onClick={handleLogout}
                  className="text-lg font-semibold text-white hover:scale-110 transition-transform hover:text-red-300"
                >
                  Logout
                </button>
                <Link
                  to="/profile"
                  className="ml-4 px-4 py-1.5 rounded-full bg-gradient-to-r from-pink-500 via-indigo-500 to-blue-500 text-base text-white font-bold shadow-lg border border-white/30 animate-gradient-x tracking-wide flex items-center gap-2 hover:scale-105 transition-transform"
                  onClick={() => setMenuOpen(false)}
                  title="Profile"
                >
                  <span className="drop-shadow-lg">{user.username || user.name || user.email || "User"}</span>
                  <span>🚀</span>
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-lg font-semibold text-white hover:scale-110 transition-transform hover:text-indigo-200"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="text-lg font-semibold text-white hover:scale-110 transition-transform hover:text-pink-200"
                  onClick={() => setMenuOpen(false)}
                >
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      {/* Fun animated underline */}
      <div className="h-1 w-full bg-gradient-to-r from-pink-400 via-indigo-400 to-blue-400 animate-gradient-x"></div>
      <style>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 4s ease-in-out infinite;
        }
      `}</style>
    </nav>
  );
}
