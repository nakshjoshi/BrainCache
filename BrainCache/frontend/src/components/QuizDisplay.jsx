
import { useState } from "react";
import axios from "axios";
import { FaStar, FaCheckCircle, FaTimesCircle, FaRedo, FaRocket } from "react-icons/fa";

export default function QuizDisplay({ rawQuiz, topic, difficulty, numQuestions }) {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  // Clear localStorage and reload to reset app
  const handleStartOver = () => {
    localStorage.removeItem("quiz");
    window.location.reload();
  };

  const questions = rawQuiz
    .split("---")
    .map((block) => block.trim())
    .filter((block) => block.includes("Question:"));

  const parsed = questions.map((qBlock) => {
    const lines = qBlock.split("\n").map((line) => line.trim());
    const question = lines.find((line) => line.startsWith("Question:"))?.replace("Question:", "").trim();
    const options = ["A", "B", "C", "D"].map((letter) => {
      const line = lines.find((l) => l.startsWith(`${letter}.`));
      return line ? line.replace(`${letter}.`, "").trim() : "";
    });
    const answerLine = lines.find((l) => l.startsWith("Answer:")) || "";
    const explanationLine = lines.find((l) => l.startsWith("Explanation:")) || "";

    return {
      question,
      options,
      answer: answerLine.replace("Answer:", "").trim(),
      explanation: explanationLine.replace("Explanation:", "").trim(),
    };
  });

  const handleSelect = (qIndex, optionLetter) => {
    if (showResults) return; // disable clicking after score shown
    setSelectedAnswers({ ...selectedAnswers, [qIndex]: optionLetter });
  };

  const calculateScore = () => {
    return parsed.reduce((score, q, idx) => {
      return selectedAnswers[idx] === q.answer ? score + 1 : score;
    }, 0);
  };

  const handleShowScore = async () => {
    setShowResults(true);
    const score = calculateScore();
    const questionsToSend = parsed.map((q, index) => ({
      question: q.question,
      options: q.options,
      correctAnswer: q.answer,
      selectedAnswer: selectedAnswers[index] || null,
      explanation: q.explanation,
    }));
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/api/submit`,
        {
          score,
          questions: questionsToSend,
          topic,
          difficulty,
          numQuestions,
        },
        { withCredentials: true }
      );
      localStorage.setItem("quizSubmitted", "true");
    } catch (err) {
      // Optionally show error toast
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden  px-4 py-8">
      {/* Decorative Blobs */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-400 opacity-20 rounded-full blur-3xl animate-pulse -z-10" />

      <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8 max-w-6xl w-full text-center flex flex-col items-center">
        <div className="flex items-center justify-center mb-4">
          <FaRocket className="text-indigo-300 text-4xl animate-bounce" />
        </div>
        <h2 className="text-4xl font-extrabold leading-tight mb-2 tracking-tight bg-gradient-to-r from-indigo-300 via-purple-300 to-blue-300 bg-clip-text text-transparent drop-shadow-lg">
          Quiz Time!
        </h2>
        <div className="flex gap-4 justify-center mb-4 text-indigo-200 text-base">
          <span className="px-3 py-1 rounded-full bg-indigo-700/40 border border-indigo-400 font-semibold">
            Topic: <span className="font-bold text-indigo-100">{topic}</span>
          </span>
          <span className="px-3 py-1 rounded-full bg-purple-700/40 border border-purple-400 font-semibold">
            Difficulty: <span className="font-bold text-purple-100 capitalize">{difficulty}</span>
          </span>
          <span className="px-3 py-1 rounded-full bg-blue-700/40 border border-blue-400 font-semibold">
            <FaStar className="inline mb-1 text-yellow-300" /> {numQuestions} Qs
          </span>
        </div>

        <div className="space-y-8 w-full">
          {parsed.map((q, idx) => {
            const isAnswered = selectedAnswers[idx];
            return (
              <div
                key={idx}
                className={`relative bg-white/10 border border-indigo-200/30 rounded-2xl shadow-lg p-6 text-left transition-all duration-300 ${showResults ? "opacity-80" : ""} hover:scale-105`}
              >
                <h3 className="text-xl font-bold text-indigo-100 mb-4 flex items-center gap-2">
                  <span className="text-indigo-400">Q{idx + 1}.</span> {q.question}
                </h3>
                <div className="grid gap-3">
                  {q.options.map((opt, oIdx) => {
                    const letter = String.fromCharCode(65 + oIdx);
                    const isSelected = selectedAnswers[idx] === letter;
                    const isCorrect = showResults && q.answer === letter;
                    const isWrong = showResults && isSelected && letter !== q.answer;
                    return (
                      <button
                        key={letter}
                        type="button"
                        disabled={showResults}
                        onClick={() => handleSelect(idx, letter)}
                        className={`w-full flex items-center gap-3 px-5 py-3 rounded-xl border transition-all duration-200 text-lg font-medium focus:outline-none
                          ${isCorrect ? "bg-green-200/80 text-green-900 border-green-400 font-bold" : ""}
                          ${isWrong ? "bg-red-200/80 text-red-900 border-red-400" : ""}
                          ${!showResults && isSelected ? "bg-indigo-200/80 text-indigo-900 border-indigo-400" : "hover:bg-white/20"}
                        `}
                      >
                        <span className="font-bold text-indigo-400">{letter}.</span> {opt}
                        {showResults && isCorrect && (
                          <FaCheckCircle className="ml-2 text-green-500" />
                        )}
                        {showResults && isWrong && (
                          <FaTimesCircle className="ml-2 text-red-500" />
                        )}
                      </button>
                    );
                  })}
                </div>
                {showResults && (
                  <div className="mt-3 text-yellow-200 bg-yellow-900/30 rounded-lg px-4 py-2 text-base flex items-center gap-2">
                    <FaStar className="text-yellow-300" />
                    <span className="italic">{q.explanation}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {!showResults ? (
          <button
            onClick={handleShowScore}
            className="mt-8 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-purple-600 hover:to-indigo-600 text-white font-bold px-10 py-3 rounded-full shadow-lg text-xl flex items-center gap-2 mx-auto transition-all"
          >
            🧮 Show Score
          </button>
        ) : (
          <div className="mt-8 text-center text-2xl font-extrabold text-indigo-100 flex flex-col items-center gap-2">
            <span>🎉 Your Score: <span className="text-yellow-300">{calculateScore()}</span> / {parsed.length}</span>
            <button
              onClick={handleStartOver}
              className="mt-2 px-6 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-bold shadow-lg hover:scale-105 transition-transform flex items-center gap-2"
            >
              <FaRedo className="text-lg" /> Try Again
            </button>
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
