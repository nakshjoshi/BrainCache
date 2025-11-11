import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_API}/api/auth/login`,
                { email, password },
                { withCredentials: true }
            );
            toast.success("Login successful!");
            navigate("/home");
        } catch (error) {
            const msg = error.response?.data?.error || "Login failed";
            toast.error(msg);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
            {/* Decorative Blobs */}

            <div className="relative bg-white/10 backdrop-blur-2xl rounded-3xl p-10 w-full max-w-md shadow-2xl text-white space-y-8 border border-white/20 flex flex-col items-center">
                <div className="flex flex-col items-center gap-2 mb-2">
                    <svg width="48" height="48" fill="none" viewBox="0 0 48 48"><circle cx="24" cy="24" r="24" fill="url(#a)"/><path d="M24 13c-4.418 0-8 3.134-8 7v2c0 1.657 1.343 3 3 3h10c1.657 0 3-1.343 3-3v-2c0-3.866-3.582-7-8-7Zm0 2c3.314 0 6 2.239 6 5v2c0 .552-.448 1-1 1H19c-.552 0-1-.448-1-1v-2c0-2.761 2.686-5 6-5Zm-5 13a1 1 0 0 0-1 1v2c0 2.21 3.134 4 7 4s7-1.79 7-4v-2a1 1 0 0 0-1-1H19Zm1 2h8v1c0 .552-.448 1-1 1h-6c-.552 0-1-.448-1-1v-1Z" fill="#fff"/>
                    <defs><linearGradient id="a" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse"><stop stopColor="#6366F1"/><stop offset="1" stopColor="#EC4899"/></linearGradient></defs></svg>
                    <h2 className="text-4xl font-extrabold text-transparent bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text drop-shadow-lg text-center">Welcome Back!</h2>
                    <p className="text-indigo-100 text-base text-center">Sign in to continue your BrainCache journey 🚀</p>
                </div>
                <form onSubmit={handleLogin} className="space-y-5 w-full">
                    <div>
                        <label className="block text-sm mb-1 text-indigo-200 font-semibold">Email</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 rounded-xl bg-white/20 text-white placeholder-indigo-200 border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white/30 transition"
                            placeholder="Enter your email address"
                        />
                    </div>
                    <div>
                        <label className="block text-sm mb-1 text-indigo-200 font-semibold">Password</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 rounded-xl bg-white/20 text-white placeholder-indigo-200 border border-white/20 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:bg-white/30 transition"
                            placeholder="Enter your password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:to-indigo-500 py-3 rounded-full text-white font-bold text-lg shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                         Login
                    </button>
                </form>
                <p className="text-sm text-center text-indigo-200">
                    Don’t have an account?{' '}
                    <a href="/signup" className="text-pink-300 font-bold hover:underline transition">Sign up here</a>
                </p>
            </div>

            {/* Subtle animated stars */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <svg width="100%" height="100%">
                    <circle cx="10%" cy="20%" r="2" fill="#fff" opacity="0.7">
                        <animate attributeName="opacity" values="0.7;0.2;0.7" dur="2s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="80%" cy="30%" r="1.5" fill="#fff" opacity="0.5">
                        <animate attributeName="opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="60%" cy="80%" r="2" fill="#fff" opacity="0.6">
                        <animate attributeName="opacity" values="0.6;0.1;0.6" dur="2.5s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="30%" cy="60%" r="1" fill="#fff" opacity="0.4">
                        <animate attributeName="opacity" values="0.4;0.9;0.4" dur="2.2s" repeatCount="indefinite" />
                    </circle>
                </svg>
            </div>
        </div>
    );
}
