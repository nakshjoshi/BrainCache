// src/pages/Home.jsx
import { useEffect, useState } from "react";
import QuizForm from "../components/QuizForm.jsx";
import QuizDisplay from "../components/QuizDisplay.jsx";

export default function Home() {
  const [quizData, setQuizData] = useState(() => {
    const saved = localStorage.getItem("quiz");
    return saved ? JSON.parse(saved) : null;
  });


  useEffect(() => {
    const submitted = localStorage.getItem("quizSubmitted");
    if (submitted === "true") {
      setQuizData(null);
      localStorage.removeItem("quiz");
      localStorage.removeItem("quizSubmitted");
    }
  }, []);

 return !quizData ? (
    <QuizForm onQuizFetched={data => {
      setQuizData(data);
      localStorage.setItem("quiz", JSON.stringify(data));
    }} />
  ) : (
    <QuizDisplay
      rawQuiz={quizData.quiz}
      topic={quizData.topic}
      difficulty={quizData.difficulty}
      numQuestions={quizData.numQuestions}
      onStartOver={() => setQuizData(null)}
    />
  );
}
