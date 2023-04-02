import express from "express";
import { getUser, getUserById, updateUser } from "../controllers/user.js";

const router = express.Router();

router.put("/me", updateUser);
router.get("/", getUser);
router.get("/:id", getUserById);

export default router;
