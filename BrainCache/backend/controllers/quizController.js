// controllers/quizController.js
const { OpenAI } = require("openai");
require("dotenv").config();
const QuizAttempt = require("../models/QuizAttempt.js")

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

exports.generateQuiz = async (req, res) => {
  const { topic, difficulty, numQuestions } = req.body;
  console.log("📩 Received:", req.body);

  // Sanitize and fallback defaults
  const safeTopic = topic?.trim() || "arrays";
  const safeDifficulty = difficulty || "easy";
  const safeNumQuestions = Math.min(parseInt(numQuestions) || 3, 10); // max 10

  const prompt = `
Generate ${safeNumQuestions} multiple-choice single answer correct type questions on the coding-topic "${safeTopic}" at a "${safeDifficulty}" level.
Each question should include:
- 4 options labeled A–D
- Correct answer with label: Answer: X
- One-line explanation

Format:
Question: ...
Options:
A. ...
B. ...
C. ...
D. ...
Answer: X
Explanation: ...

Separate each question block with '---'
Only return questions. No extra text or commentary.
`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    res.json({ quiz: completion.choices[0].message.content });
  } catch (error) {
    console.error("❌ OpenAI Error:", error.message);
    res.status(500).json({ error: "Failed to generate quiz" });
  }
};


exports.submitQuiz = async (req, res) => {
  const { topic, difficulty, score, numQuestions, questions } = req.body;
  console.log(topic, difficulty, score, numQuestions, questions)

  try {
    const attempt = await QuizAttempt.create({
      userId: req.userId,
      topic,
      difficulty,
      score,
      numQuestions,
      questions,
    });

    res.status(201).json({ message: "Quiz submitted", attempt });
  } catch (err) {
    console.error("Quiz submission error:", err);
    res.status(500).json({ error: "Failed to submit quiz" });
  }
};