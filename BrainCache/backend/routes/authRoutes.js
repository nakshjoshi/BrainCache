const express = require("express");
const router = express.Router();
const { signup, login } = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");
const User = require("../models/User");


router.post("/signup", signup);
router.post("/login", login);
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});
router.post("/logout", (req, res) => {
  res
    .clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    })
    .status(200)
    .json({ message: "Logged out successfully" });
});



module.exports = router;
