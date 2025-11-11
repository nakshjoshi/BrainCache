import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";

export default function History() {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_API}/api/history`, {
                    withCredentials: true,
                });
                setHistory(res.data);
            } catch (err) {
                console.error("Failed to fetch history", err);
            } finally {
                setLoading(false);
            }
        };
        fetchHistory();
    }, []);

    return (
        <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden px-4 py-10">
            {/* Decorative Blobs */}
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-400 opacity-20 rounded-full blur-3xl animate-pulse -z-10" />

            <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-3xl shadow-xl p-8 max-w-6xl w-full flex flex-col items-center">
                <h1 className="text-4xl font-extrabold leading-tight mb-6 tracking-tight bg-gradient-to-r from-indigo-300 via-purple-300 to-blue-300 bg-clip-text text-transparent drop-shadow-lg text-center">📜 Quiz History</h1>

                {loading ? (
                    <p className="text-center text-indigo-200">Loading...</p>
                ) : history.length === 0 ? (
                    <p className="text-center text-indigo-300">No quiz attempts yet.</p>
                ) : (
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {history.map((entry) => (
                            <Card
                                key={entry._id}
                                className="w-full h-56 flex items-center justify-center bg-gradient-to-br from-indigo-900/60 via-purple-900/50 to-blue-900/60 border border-indigo-300/20 shadow-lg transition-transform duration-300 hover:scale-105 rounded-2xl"
                            >
                                <CardContent className="flex flex-col items-center justify-center h-full w-full p-3 space-y-2">
                                    <h2 className="text-xl font-bold text-indigo-100 text-center mb-1 flex items-center gap-2">
                                        <span className="text-indigo-200">{entry.topic}</span>
                                    </h2>
                                    <div className="flex gap-2 text-sm mb-1">
                                        <span className="px-2 py-1 rounded-full bg-indigo-700/30 border border-indigo-300 font-semibold text-indigo-100">{entry.numQuestions} Qs</span>
                                        {entry.difficulty === 'easy' && (
                                            <span className="px-2 py-1 rounded-full bg-gradient-to-r from-green-400 via-lime-300 to-green-300 border border-green-400 font-bold text-green-900 capitalize shadow-md drop-shadow-md">Easy</span>
                                        )}
                                        {entry.difficulty === 'medium' && (
                                            <span className="px-2 py-1 rounded-full bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-200 border border-yellow-400 font-bold text-yellow-900 capitalize shadow-md drop-shadow-md">Medium</span>
                                        )}
                                        {entry.difficulty === 'hard' && (
                                            <span className="px-2 py-1 rounded-full bg-gradient-to-r from-red-400 via-pink-400 to-orange-400 border border-red-400 font-bold text-red-900 capitalize shadow-md drop-shadow-md">Hard</span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2 text-lg font-bold text-yellow-200">
                                        <span>Score:</span>
                                        <span className="text-white">{entry.score}</span>
                                        <span className="text-indigo-100">/ {entry.numQuestions}</span>
                                    </div>
                                    <p className="text-xs text-indigo-200 text-center mt-2">
                                        {new Date(entry.createdAt).toLocaleString()}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
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
