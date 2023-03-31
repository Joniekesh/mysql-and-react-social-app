import express from "express";
import { addRemoveLike, getLikes } from "../controllers/like.js";
const router = express.Router();

router.post("/:postId", addRemoveLike);
router.get("/:postId", getLikes);

export default router;
