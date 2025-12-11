import express from "express";
import cors from "cors";

import bagRoutes from "../routes/bagRoutes.js";
import userRoutes from "../routes/userRoutes.js";
import voteRoutes from "../routes/voteRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/bag", bagRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/vote", voteRoutes);

export default app;
