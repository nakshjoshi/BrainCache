// backend/routes/quizRoutes.js
const express = require('express');
const router = express.Router();
const { generateQuiz, submitQuiz } = require('../controllers/quizController');
const authMiddleware = require('../middlewares/authMiddleware');
const QuizAttempt = require("../models/QuizAttempt")
router.post('/generate-quiz', generateQuiz);
router.post("/submit", authMiddleware, submitQuiz);
 router.get("/history", authMiddleware, async (req, res) => {
try {
    const submissions = await QuizAttempt.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(submissions);
} catch (err) {
    res.status(500).json({ error: "Failed to fetch history" });
}
});

module.exports = router;
