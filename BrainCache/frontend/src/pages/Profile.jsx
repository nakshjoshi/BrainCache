
import { useEffect, useState } from "react";
import axios from "axios";
import { FaUserCircle, FaChartBar, FaCheckCircle, FaQuestionCircle, FaTrophy } from "react-icons/fa";

export default function Profile() {
    const [user, setUser] = useState(null);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfileAndStats = async () => {
            try {
                const userRes = await axios.get(`${import.meta.env.VITE_BACKEND_API}/api/auth/me`, {
                    withCredentials: true,
                });
                setUser(userRes.data);

                const historyRes = await axios.get(`${import.meta.env.VITE_BACKEND_API}/api/history`, {
                    withCredentials: true,
                });
                setHistory(historyRes.data);
            } catch (err) {
                console.error("Error fetching profile or history", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfileAndStats();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center text-secondary text-lg neon-text-green">Loading...</div>
            </div>
        );
    }
    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center text-destructive text-lg">User not logged in</div>
            </div>
        );
    }

    // Calculate stats
    const totalQuizzes = history.length;
    const totalQuestions = history.reduce((sum, h) => sum + h.questions.length, 0);
    const totalCorrect = history.reduce(
        (sum, h) => sum + (h.score || 0),
        0
    );
    const easyQuizzes = history.filter((h) => h.difficulty === "easy").length;
    const mediumQuizzes = history.filter((h) => h.difficulty === "medium").length;
    const hardQuizzes = history.filter((h) => h.difficulty === "hard").length;
    const accuracy = totalQuestions === 0 ? 0 : ((totalCorrect / totalQuestions) * 100).toFixed(2);

    // Optionally, install "react-icons" for beautiful icons: npm install react-icons
    return (
        <div className="min-h-screen flex items-center justify-center overflow-hidden">
            <div className="w-full max-w-xl mx-auto bg-card/80 backdrop-blur-lg rounded-3xl shadow-2xl border-2 border-primary/50 neon-border-green p-6 relative overflow-hidden">
                {/* Decorative Gradient Circles */}
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-primary/20 opacity-20 rounded-full blur-2xl pointer-events-none"></div>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-secondary/20 opacity-20 rounded-full blur-2xl pointer-events-none"></div>

                <div className="flex flex-col items-center mb-6">
                    <FaUserCircle className="text-6xl text-primary neon-text-green drop-shadow-lg mb-1" />
                    <h1 className="text-3xl font-extrabold text-foreground tracking-tight mb-0.5 text-center">{user.name}</h1>
                    <p className="text-base text-secondary">{user.email}</p>
                </div>

                <div className="bg-card/50 rounded-2xl p-4 mb-6 shadow-inner border-2 border-secondary/50 neon-border-green">
                    <h2 className="flex items-center gap-2 text-xl font-bold text-primary mb-3">
                        <FaChartBar className="text-secondary" /> Your Quiz Stats
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col items-center">
                            <FaTrophy className="text-2xl text-primary mb-0.5" />
                            <span className="text-base font-semibold text-foreground">{totalQuizzes}</span>
                            <span className="text-xs text-muted-foreground">Quizzes</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <FaQuestionCircle className="text-2xl text-secondary mb-0.5" />
                            <span className="text-base font-semibold text-foreground">{totalQuestions}</span>
                            <span className="text-xs text-muted-foreground">Questions</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <FaCheckCircle className="text-2xl text-secondary mb-0.5" />
                            <span className="text-base font-semibold text-foreground">{totalCorrect}</span>
                            <span className="text-xs text-muted-foreground">Correct</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <FaChartBar className="text-2xl text-primary mb-0.5" />
                            <span className="text-base font-semibold text-foreground">{accuracy}%</span>
                            <span className="text-xs text-muted-foreground">Accuracy</span>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between gap-2 mb-6">
                    <div className="flex-1 bg-secondary/20 rounded-xl p-2 flex flex-col items-center border-2 border-secondary">
                        <span className="text-lg font-bold text-secondary">{easyQuizzes}</span>
                        <span className="text-xs text-foreground">Easy</span>
                    </div>
                    <div className="flex-1 bg-primary/20 rounded-xl p-2 flex flex-col items-center border-2 border-primary">
                        <span className="text-lg font-bold text-primary">{mediumQuizzes}</span>
                        <span className="text-xs text-foreground">Medium</span>
                    </div>
                    <div className="flex-1 bg-destructive/20 rounded-xl p-2 flex flex-col items-center border-2 border-destructive">
                        <span className="text-lg font-bold text-destructive">{hardQuizzes}</span>
                        <span className="text-xs text-foreground">Hard</span>
                    </div>
                </div>

                <div className="flex justify-center">
                    <button
                        onClick={() => {
                            if (window.confirm("Are you sure you want to logout?")) {
                                localStorage.removeItem("quiz");
                                localStorage.removeItem("quizSubmitted");
                                window.location.href = "/login";
                            }
                        }}
                        className="px-6 py-2 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-lg neon-glow-hover hover:scale-105 transition-transform"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}
