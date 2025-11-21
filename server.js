import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bagRoutes from "./routes/bagRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import voteRoutes from "./routes/voteRoutes.js";
import mongoose from "mongoose";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/bag", bagRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/vote", voteRoutes);


// connect database + start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database connected");
    app.listen(process.env.PORT, () => {
      console.log("API running on port " + process.env.PORT);
    });
  })
  .catch((err) => console.log("DB error:", err));
