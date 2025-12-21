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
      "https://lays-configurator-vert.vercel.app/",
      "https://lays-vue.vercel.app/" 
    ],
    credentials: true
  })
)

app.use(express.json({ limit: "50mb" }))
app.use(express.urlencoded({ limit: "50mb", extended: true }))

app.use("/uploads", express.static("uploads"))

// routes
app.use("/api/v1", bagRoutes)
app.use("/api/v1/user", userRoutes)
app.use("/api/v1/vote", voteRoutes)
app.use("/api/v1/bag/mine", bagRoutes)


export default app
