import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";



import { FaRocket, FaUserPlus, FaSignInAlt } from "react-icons/fa";

export default function Landing() {
    return (
        <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden px-6">
            {/* Decorative Blobs */}
            {/* Glass Card */}
            <div className="backdrop-blur-lg bg-card/80 border-2 border-primary/50 neon-border-green rounded-3xl shadow-2xl p-10 max-w-2xl text-center flex flex-col items-center">
                <div className="mb-6 flex justify-center">
                    <FaRocket className="text-primary neon-text-green text-5xl animate-bounce" />
                </div>
                <h1 className="text-5xl font-extrabold leading-tight mb-4 tracking-tight text-primary neon-text-green drop-shadow-lg">
                    Welcome to BrainCache
                </h1>
                <p className="text-lg text-foreground mb-8 font-medium">
                    Sharpen your coding skills with <span className="font-bold text-secondary neon-text-green">AI-generated quizzes</span>.<br />
                    Personalized, challenging, and fun!
                </p>
                <div className="flex gap-4 justify-center mb-4">
                    <Link to="/home">
                        <Button
                            variant="default"
                            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg font-semibold rounded-full shadow-lg neon-border-green transition-all flex items-center gap-2"
                        >
                            <FaUserPlus className="text-xl" />
                            Get Started
                        </Button>
                    </Link>
                    <Link to="/login">
                        <Button
                            variant="outline"
                            className="text-secondary border-2 border-secondary bg-background/50 px-8 py-3 text-lg font-semibold rounded-full shadow-lg hover:bg-secondary hover:text-background neon-border-green transition-all flex items-center gap-2"
                        >
                            <FaSignInAlt className="text-xl" />
                            Login
                        </Button>
                    </Link>
                </div>
                <span className="text-foreground text-sm opacity-80">
                    No account? <Link to="/signup" className="underline text-primary hover:text-secondary">Sign up free</Link>
                </span>
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
        </section>
    );
}
