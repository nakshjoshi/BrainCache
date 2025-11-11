import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";



import { FaRocket, FaUserPlus, FaSignInAlt } from "react-icons/fa";

export default function Landing() {
    return (
        <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden  px-6">
            {/* Decorative Blobs */}
            {/* Glass Card */}
            <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-10 max-w-2xl text-center flex flex-col items-center">
                <div className="mb-6 flex justify-center">
                    <FaRocket className="text-indigo-300 text-5xl animate-bounce" />
                </div>
                <h1 className="text-5xl font-extrabold leading-tight mb-4 tracking-tight bg-gradient-to-r from-indigo-300 via-purple-300 to-blue-300 bg-clip-text text-transparent drop-shadow-lg">
                    Welcome to BrainCache
                </h1>
                <p className="text-lg text-indigo-100 mb-8 font-medium">
                    Sharpen your coding skills with <span className="font-bold text-indigo-200">AI-generated quizzes</span>.<br />
                    Personalized, challenging, and fun!
                </p>
                <div className="flex gap-4 justify-center mb-4">
                    <Link to="/home">
                        <Button
                            variant="default"
                            className="text-white px-8 py-3 text-lg font-semibold rounded-full shadow-lg bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-purple-500 hover:to-indigo-500 transition-all flex items-center gap-2"
                        >
                            <FaUserPlus className="text-xl" />
                            Get Started
                        </Button>
                    </Link>
                    <Link to="/login">
                        <Button
                            variant="outline"
                            className="text-white border-white bg-slate-800 px-8 py-3 text-lg font-semibold rounded-full shadow-lg hover:bg-white hover:text-indigo-800 transition-all flex items-center gap-2"
                        >
                            <FaSignInAlt className="text-xl" />
                            Login
                        </Button>
                    </Link>
                </div>
                <span className="text-indigo-200 text-sm opacity-80">
                    No account? <Link to="/signup" className="underline hover:text-white">Sign up free</Link>
                </span>
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
        </section>
    );
}
