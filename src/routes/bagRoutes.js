import express from "express";
import { auth, admin } from "../middleware/auth.js";
import {
  createBag,
  getBags,
  getBagById,
  updateBag,
  deleteBag
} from "../controllers/bagController.js";
import { upload } from "../middleware/upload.js";


const router = express.Router();

router.post("/", createBag);         // /bag POST  (token yes)
router.get("/", getBags);                  // /bag GET   (public)
router.get("/:id", getBagById);            // /bag/:id GET (public)
router.put("/:id", auth, updateBag);       // /bag/:id PUT (token yes)
router.delete("/:id", auth, admin, deleteBag); // /bag/:id DELETE (admin)

router.post(
  "/",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "backgroundImage", maxCount: 1 }
  ]),
  createBag
);

export default router;
