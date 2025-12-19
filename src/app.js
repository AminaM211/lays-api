// app.js
import express from "express"
import cors from "cors"

import bagRoutes from "./routes/bagRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import voteRoutes from "./routes/voteRoutes.js"
import authRoutes from "./routes/authRoutes.js"

const app = express()

app.use(cors())
app.use(express.json({ limit: "50mb" }))
app.use(express.urlencoded({ limit: "50mb", extended: true }))

app.use("/uploads", express.static("uploads"))

// routes
app.use("/api/v1/bag", bagRoutes)
app.use("/api/v1/user", userRoutes)
app.use("/api/v1/vote", voteRoutes)
app.use("/api/v1/auth", authRoutes)


export default app
