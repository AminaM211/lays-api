import dotenv from "dotenv"
dotenv.config()

import mongoose from "mongoose"
import { createServer } from "http"
import { Server } from "socket.io"

import app from "./src/app.js"
import Bag from "./src/models/Bag.js"

const PORT = process.env.PORT || 4000

const httpServer = createServer(app)

const io = new Server(httpServer, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://lays-vue-2.vercel.app",
      "https://lays-configurator-vert.vercel.app"
    ],
    credentials: true
  }
})

io.on("connection", (socket) => {
  socket.on("vote", async ({ bagId, userId, action }) => {
    console.log("🔥 vote", bagId, userId, action)
  
    const bag = await Bag.findById(bagId)
    if (!bag) return
  
    if (!bag.voters) bag.voters = []
  
    const index = bag.voters
      .map(v => v.toString())
      .indexOf(userId)
  
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
      votes: bag.votes,
      voters: bag.voters
    })
  })
  
  })
 
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("✅ MongoDB connected")
  httpServer.listen(PORT, () => {
    console.log("🚀 Server + Socket running on port", PORT)
  })
})
