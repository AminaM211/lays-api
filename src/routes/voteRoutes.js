import express from "express"
import { auth, admin } from "../middleware/auth.js"
import {
  addVote,
  removeVote,
  getVotes,
  getVotesForBag
} from "../controllers/voteController.js"

const router = express.Router()

router.post("/:bagId", auth, addVote)
router.delete("/:bagId", auth, removeVote)
router.get("/", getVotes)
router.get("/:bagId", getVotesForBag)

export default router
