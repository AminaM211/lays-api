import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bagRoutes from "./routes/bagRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/bag", bagRoutes);
app.use("/api/v1/user", userRoutes);

app.listen(process.env.PORT, () => {
  console.log("API running on port " + process.env.PORT);
});
