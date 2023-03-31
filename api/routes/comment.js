import express from "express";
import {
	addComment,
	deleteComment,
	getComments,
	updateComment,
} from "../controllers/comment.js";
const router = express.Router();

router.get("/:id", getComments);
router.post("/", addComment);
router.put("/:id", updateComment);
router.delete("/:id", deleteComment);

export default router;
