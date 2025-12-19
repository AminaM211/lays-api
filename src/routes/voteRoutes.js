import express from "express";
import { auth, admin } from "../middleware/auth.js";
import { addVote, removeVote, getVotes, getVotesForBag } from "../controllers/voteController.js";

const router = express.Router();

// /vote/:bag  POST -> stemmen (token nodig)
router.post("/", auth, addVote);

// /vote/:bag  DELETE -> stem weghalen (token nodig)
router.delete("/:bagId", removeVote);

// /vote GET -> overzicht alle votes (admin)
router.get("/", admin, getVotes);
router.get("/:bagId", getVotesForBag);

export default router;
