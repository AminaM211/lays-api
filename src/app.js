import express from "express"
import cors from "cors"
import bagRoutes from "./routes/bagRoutes.js"
import userRoutes from "./routes/userRoutes.js"

const app = express()

app.use(cors())
// app.use(express.json())

// 1) Body limits MOET boven alle routes
app.use(express.json({ limit: "50mb" }))
app.use(express.urlencoded({ limit: "50mb", extended: true }))

// 2) Static files
app.use("/uploads", express.static("uploads"))

// 3) Jouw routes
app.use("/api/v1/bag", bagRoutes)
app.use("/api/v1/user", userRoutes)


export default app
