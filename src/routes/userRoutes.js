import express from "express";
import { register, login, getUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/", register);
router.post("/auth", login);
router.get("/:id", getUser);

export default router;
