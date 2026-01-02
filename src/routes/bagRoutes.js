import express from "express"
import { auth } from "../middleware/auth.js"
import {
  createBag,
  getBags,
  getBagById,
  updateBag,
  deleteBag,
  getMyBags
} from "../controllers/bagController.js"

const router = express.Router()

// CREATE
router.post("/", auth, createBag)

// READ
router.get("/", getBags)          // /api/v1/bag
router.get("/mine", auth, getMyBags) // /api/v1/bag/mine
router.get("/:id", getBagById)

// UPDATE / DELETE
router.put("/:id", auth, updateBag)
router.delete("/:id", auth, deleteBag)

export default router
