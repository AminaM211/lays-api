import express from "express"
import { auth, admin } from "../middleware/auth.js"
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
router.post("/bag", auth, createBag)

// READ
router.get("/bag", getBags)              // ✅ ALLE designs
router.get("/bag/mine", auth, getMyBags) // ✅ MIJN designs
router.get("/bag/:id", getBagById)

// UPDATE / DELETE
router.put("/bag/:id", auth, updateBag)
// router.delete("/bag/:id", auth, admin, deleteBag)
router.delete("/bag/:id", auth, deleteBag)

export default router
