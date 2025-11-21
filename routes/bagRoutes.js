import express from "express";
import { createBag, getBags, getBag, updateBag, deleteBag } from "../controllers/bagController.js";
import { auth, admin } from "../middleware/auth.js";

const router = express.Router();

router.post("/", createBag);
router.get("/", getBags);
router.get("/:id", getBag);
router.put("/:id", auth, updateBag);
router.delete("/:id", auth, admin, deleteBag);

export default router;
