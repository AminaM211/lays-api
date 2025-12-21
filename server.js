import dotenv from "dotenv"
import mongoose from "mongoose"
import app from "./src/app.js"

dotenv.config()

const PORT = process.env.PORT || 4000
const mongoURI = process.env.MONGO_URI

if (!mongoURI) {
  console.error("❌ MONGO_URI missing")
  process.exit(1)
}

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("✅ MongoDB connected")

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`)
    })
  })
  .catch(err => {
    console.error("❌ MongoDB error:", err.message)
    process.exit(1)
  })
