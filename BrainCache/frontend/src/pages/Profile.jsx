
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
            <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">
                <div className="text-center text-white text-lg">Loading...</div>
            </div>
        );
    }
    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">
                <div className="text-center text-red-500 text-lg">User not logged in</div>
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
            <div className="w-full max-w-xl mx-auto bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-indigo-400 p-6 relative overflow-hidden">
                {/* Decorative Gradient Circles */}
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-indigo-400 opacity-20 rounded-full blur-2xl pointer-events-none"></div>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-pink-400 opacity-20 rounded-full blur-2xl pointer-events-none"></div>

                <div className="flex flex-col items-center mb-6">
                    <FaUserCircle className="text-6xl text-indigo-300 drop-shadow-lg mb-1" />
                    <h1 className="text-3xl font-extrabold text-white tracking-tight mb-0.5 text-center">{user.name}</h1>
                    <p className="text-base text-indigo-100">{user.email}</p>
                </div>

                <div className="bg-white/10 rounded-2xl p-4 mb-6 shadow-inner border border-indigo-200">
                    <h2 className="flex items-center gap-2 text-xl font-bold text-indigo-200 mb-3">
                        <FaChartBar className="text-indigo-300" /> Your Quiz Stats
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col items-center">
                            <FaTrophy className="text-2xl text-yellow-400 mb-0.5" />
                            <span className="text-base font-semibold text-white">{totalQuizzes}</span>
                            <span className="text-xs text-indigo-100">Quizzes</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <FaQuestionCircle className="text-2xl text-pink-300 mb-0.5" />
                            <span className="text-base font-semibold text-white">{totalQuestions}</span>
                            <span className="text-xs text-indigo-100">Questions</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <FaCheckCircle className="text-2xl text-green-400 mb-0.5" />
                            <span className="text-base font-semibold text-white">{totalCorrect}</span>
                            <span className="text-xs text-indigo-100">Correct</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <FaChartBar className="text-2xl text-blue-400 mb-0.5" />
                            <span className="text-base font-semibold text-white">{accuracy}%</span>
                            <span className="text-xs text-indigo-100">Accuracy</span>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between gap-2 mb-6">
                    <div className="flex-1 bg-gradient-to-r from-green-400/30 to-green-600/30 rounded-xl p-2 flex flex-col items-center border border-green-300">
                        <span className="text-lg font-bold text-green-200">{easyQuizzes}</span>
                        <span className="text-xs text-green-100">Easy</span>
                    </div>
                    <div className="flex-1 bg-gradient-to-r from-yellow-400/30 to-yellow-600/30 rounded-xl p-2 flex flex-col items-center border border-yellow-300">
                        <span className="text-lg font-bold text-yellow-200">{mediumQuizzes}</span>
                        <span className="text-xs text-yellow-100">Medium</span>
                    </div>
                    <div className="flex-1 bg-gradient-to-r from-pink-400/30 to-pink-600/30 rounded-xl p-2 flex flex-col items-center border border-pink-300">
                        <span className="text-lg font-bold text-pink-200">{hardQuizzes}</span>
                        <span className="text-xs text-pink-100">Hard</span>
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
                        className="px-6 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-bold shadow-lg hover:scale-105 transition-transform"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}
