import jwt from "jsonwebtoken"
import User from "../models/User.js"

export const auth = async (req, res, next) => {
  const header = req.headers.authorization || ""
  const token = header.startsWith("Bearer ") ? header.split(" ")[1] : null

  if (!token) return res.status(401).json({ message: "No token" })

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.id).select("-password")
    if (!user) return res.status(401).json({ message: "User not found" })

    req.user = user
    next()
  } catch {
    return res.status(401).json({ message: "Invalid token" })
  }
}

export const admin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin only" })
  }
  next()
}
