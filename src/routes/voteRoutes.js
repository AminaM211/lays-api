import express from "express";
import { auth, admin } from "../middleware/auth.js";
import { addVote, removeVote, getVotes } from "../controllers/voteController.js";

const router = express.Router();

router.post("/", auth, createVote)

// /vote/:bag  POST -> stemmen (token nodig)
router.post("/:bagId", auth, addVote);

// /vote/:bag  DELETE -> stem weghalen (token nodig)
router.delete("/:bagId", auth, removeVote);

// /vote GET -> overzicht alle votes (admin)
router.get("/", auth, admin, getVotes);

export default router;
