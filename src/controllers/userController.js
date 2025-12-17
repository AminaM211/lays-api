// controllers/userController.js
import User from "../models/User.js";
import jwt from "jsonwebtoken";

// user aanmaken (voor later, nu vooral handig voor andere users)
export const register = async (req, res) => {
  console.log("HEADERS:", req.headers["content-type"])
  console.log("BODY:", req.body)
  try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email in use" });
    }

    // geen bcrypt: plain text opslaan
    const user = await User.create({
      name,
      email,
      password,
      role: "user"
    });

    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: "Register failed", error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    // simpel wachtwoord checken
    if (password !== user.password) {
      return res.status(400).json({ message: "Wrong password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "4h" }
    );

    res.json({
      token,
      user: { id: user._id, email: user.email, role: user.role }
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Get user failed", error: err.message });
  }
};
