import User from "../models/User.js"
import jwt from "jsonwebtoken"

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body

    const existing = await User.findOne({ email })
    if (existing) {
      return res.status(400).json({ message: "User already exists" })
    }

    const user = await User.create({ name, email, password })

    res.status(201).json({ message: "User registered" })
  } catch (err) {
    res.status(500).json({ message: "Register failed", error: err.message })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    const match = await user.comparePassword(password)

    if (!match) {
      return res.status(401).json({ message: "Wrong password" })
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    )


    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/"
    })

    
    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    })
    
  } catch (err) {
    console.error("LOGIN ERROR:", err)
    res.status(500).json({
      message: "Login failed",
      error: err.message
    })
  }
}



export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Get user failed", error: err.message });
  }
};
