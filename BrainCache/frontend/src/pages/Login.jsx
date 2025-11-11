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

            <div className="relative bg-card/80 backdrop-blur-2xl rounded-3xl p-10 w-full max-w-md shadow-2xl text-foreground space-y-8 border-2 border-primary/50 neon-border-green flex flex-col items-center">
                <div className="flex flex-col items-center gap-2 mb-2">
                    <div className="text-6xl mb-2 animate-pulse">💡</div>
                    <h2 className="text-4xl font-extrabold text-primary neon-text-green drop-shadow-lg text-center">Power Up Your Brain!</h2>
                    <p className="text-secondary text-base text-center">Login to continue your coding quest 🚀</p>
                </div>
                <form onSubmit={handleLogin} className="space-y-5 w-full">
                    <div>
                        <label className="block text-sm mb-1 text-secondary font-semibold neon-text-green">📧 Email</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 rounded-xl bg-input text-foreground placeholder-muted-foreground border-2 border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
                            placeholder="your@email.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm mb-1 text-secondary font-semibold neon-text-green">🔐 Password</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 rounded-xl bg-input text-foreground placeholder-muted-foreground border-2 border-border focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition"
                            placeholder="••••••••"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-primary hover:bg-primary/90 py-3 rounded-full text-primary-foreground font-bold text-lg shadow-lg neon-glow-hover transition-all flex items-center justify-center gap-2"
                    >
                         ⚡ Login Now
                    </button>
                </form>
                <p className="text-sm text-center text-foreground">
                    New to BrainCache?{' '}
                    <a href="/signup" className="text-secondary font-bold hover:text-primary hover:underline transition neon-text-green">Create Account →</a>
                </p>
            </div>

            {/* Subtle animated stars */}
                        <div className="absolute inset-0 pointer-events-none z-0">
                <svg width="100%" height="100%">
                    <circle cx="10%" cy="20%" r="2" fill="oklch(0.85 0.25 130)" opacity="0.7">
                        <animate attributeName="opacity" values="0.7;0.2;0.7" dur="2s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="80%" cy="30%" r="1.5" fill="oklch(0.85 0.25 130)" opacity="0.5">
                        <animate attributeName="opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="60%" cy="80%" r="2" fill="oklch(0.85 0.25 130)" opacity="0.6">
                        <animate attributeName="opacity" values="0.6;0.1;0.6" dur="2.5s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="30%" cy="60%" r="1" fill="oklch(0.85 0.25 130)" opacity="0.4">
                        <animate attributeName="opacity" values="0.4;0.9;0.4" dur="2.2s" repeatCount="indefinite" />
                    </circle>
                </svg>
            </div>
        </div>
    );
}
