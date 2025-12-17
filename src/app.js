import express from "express"
import cors from "cors"
import bagRoutes from "./routes/bagRoutes.js"

const app = express()

app.use(cors())
app.use(express.json())

// serve uploaded files
app.use("/uploads", express.static("uploads"))

app.use("/api/v1/bag", bagRoutes)

export default app
