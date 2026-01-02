import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { createServer } from "http"
import { Server } from "socket.io"

import Bag from "./models/Bag.js"
import bagRoutes from "./routes/bagRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import voteRoutes from "./routes/voteRoutes.js"

const app = express()

// ─────────────────────────
// MIDDLEWARE
// ─────────────────────────
app.use(cookieParser())

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://lays-configurator-vert.vercel.app",
      "https://lays-vue-2.vercel.app"
    ],
    credentials: true
  })
)

app.use(express.json({ limit: "50mb" }))
app.use(express.urlencoded({ extended: true }))

// ─────────────────────────
// ROUTES
// ─────────────────────────
app.use("/api/v1", bagRoutes)
app.use("/api/v1/user", userRoutes)
app.use("/api/v1/vote", voteRoutes)

// ─────────────────────────
// SOCKET.IO
// ─────────────────────────
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

  socket.on("vote", async ({ bagId, userId }) => {
    try {
      const bag = await Bag.findById(bagId)
      if (!bag) return

      const index = bag.voters.indexOf(userId)

      if (index === -1) {
        bag.voters.push(userId)
      } else {
        bag.voters.splice(index, 1)
      }

      bag.votes = bag.voters.length
      await bag.save()

      io.emit("vote:update", {
        bagId,
        votes: bag.votes
      })
    } catch (err) {
      console.error("Vote socket error:", err)
    }
  })
})

// ─────────────────────────
// START SERVER
// ─────────────────────────
httpServer.listen(4000, () => {
  console.log("🚀 Server running on port 4000")
})

export default app
