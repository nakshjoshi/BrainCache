const mongoose = require("mongoose");

const quizAttemptSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  topic: String,
  difficulty: String,
  score: Number,
  numQuestions: Number,
  questions: [
    {
      question: String,
      options: [String],
      correctAnswer: String,
      selectedAnswer: String,
      explanation: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("QuizAttempt", quizAttemptSchema);
