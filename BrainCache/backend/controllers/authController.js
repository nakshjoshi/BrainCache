import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ error: "Email already registered" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword });

        // Ensure JWT_SECRET is defined
        if (!process.env.JWT_SECRET) {
            return res.status(500).json({ error: "JWT secret not configured" });
        }

        // Create JWT token on signup as well
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "2d" });

        // Set token in HTTP-only cookie after successful user creation
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 2 * 24 * 60 * 60 * 1000 // 2 days
        });

        res.status(201).json({ 
            message: "User created successfully",
            name: user.name,
            email: user.email
        });
    } catch (err) {
        console.error("Signup error:", err);
        res.status(500).json({ error: "Signup failed" });
    }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "2d" });

    // Set token in HTTP-only cookie
    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 2 * 24 * 60 * 60 * 1000 // 2 days
    });

    res.status(200).json({ name: user.name, email: user.email });
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
};
export { signup, login };