import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

import bagRoutes from "./routes/bagRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import voteRoutes from "./routes/voteRoutes.js"

const app = express()

app.use(cookieParser())

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://lays-vue-2.vercel.app",
      "https://lays-configurator-vert.vercel.app"
    ],
    credentials: true
  })
)

app.use(express.json({ limit: "50mb" }))
app.use(express.urlencoded({ extended: true }))

app.use("/api/v1/bag", bagRoutes)
app.use("/api/v1/user", userRoutes)
app.use("/api/v1/vote", voteRoutes)

export default app
