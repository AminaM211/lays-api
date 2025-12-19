import express from "express"
import crypto from "crypto"

const router = express.Router()

// tijdelijke "db" in memory
const users = [] // { email, password, token }

// POST /api/v1/auth/register
router.post("/register", (req, res) => {
  const { email, password } = req.body || {}

  if (!email || !password) {
    return res.status(400).json({ message: "email + password required" })
  }

  const exists = users.find((u) => u.email === email)
  if (exists) {
    return res.status(409).json({ message: "user already exists" })
  }

  const token = crypto.randomUUID()
  users.push({ email, password, token })

  res.json({ token, user: { email } })
})

// POST /api/v1/auth/login
router.post("/login", (req, res) => {
  const { email, password } = req.body || {}

  const user = users.find((u) => u.email === email && u.password === password)
  if (!user) {
    return res.status(401).json({ message: "wrong credentials" })
  }

  res.json({ token: user.token, user: { email: user.email } })
})

// GET /api/v1/auth/me
router.get("/me", (req, res) => {
  const token = (req.headers.authorization || "").replace("Bearer ", "")
  const user = users.find((u) => u.token === token)

  if (!user) return res.status(401).json({ message: "unauthorized" })

  res.json({ email: user.email })
})

export default router
