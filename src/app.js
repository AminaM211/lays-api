import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

import bagRoutes from "./routes/bagRoutes.js"
import userRoutes from "./routes/userRoutes.js"

const app = express()

app.use(cookieParser())

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://lays-vue-2.vercel.app",
    "https://lays-configurator-vert.vercel.app"
  ],
  credentials: true
}

// 🔑 PRE-FLIGHT (OPTIONS)
app.options("*", cors(corsOptions))

// 🔑 ECHTE REQUESTS
app.use(cors(corsOptions))

app.use(express.json({ limit: "50mb" }))
app.use(express.urlencoded({ extended: true }))

app.use("/api/v1/bag", bagRoutes)
app.use("/api/v1/user", userRoutes)

export default app
