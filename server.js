import dotenv from "dotenv"
import mongoose from "mongoose"
import app from "./src/app.js"
import { createServer } from "http"
import { Server } from "socket.io"
import Bag from "./src/models/Bag.js"


dotenv.config()

const PORT = process.env.PORT || 4000
const mongoURI = process.env.MONGO_URI

const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://lays-configurator-vert.vercel.app",
      "https://lays-vue-2.vercel.app"
    ],
    credentials: true
  }
})

io.on("connection", (socket) => {
  console.log("🟢 socket connected:", socket.id)

  socket.on("vote", async ({ bagId, userId, action }) => {
    const bag = await Bag.findById(bagId)
    if (!bag) return

    const index = bag.voters.indexOf(userId)

    if (action === "vote" && index === -1) {
      bag.voters.push(userId)
    }

    if (action === "unvote" && index !== -1) {
      bag.voters.splice(index, 1)
    }

    bag.votes = bag.voters.length
    await bag.save()

    io.emit("vote:update", {
      bagId,
      votes: bag.votes
    })
  })
})

// 🔥 BELANGRIJK: NIET app.listen
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("✅ MongoDB connected")
  httpServer.listen(PORT, () => {
    console.log("🚀 Server + Socket running on port", PORT)
  })
})