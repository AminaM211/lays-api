import dotenv from "dotenv"
import mongoose from "mongoose"
import config from "config"
import app from "./src/app.js"

dotenv.config()

const PORT = 4000
const mongoURI = config.get("db.uri") || process.env.MONGO_URI

mongoose.connect(mongoURI)
  .then(() => {
    console.log("✅ MongoDB connected")

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`)
    })
  })
  .catch(err => {
    console.error("❌ MongoDB error", err)
    process.exit(1)
  })
