import express from "express";
import {
	createPost,
	deletePost,
	getPost,
	getPosts,
	getTimeLinePosts,
	updatePost,
} from "../controllers/post.js";

const router = express.Router();

router.post("/", createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);
router.get("/", getPosts);
router.get("/timeline", getTimeLinePosts);

router.get("/:id", getPost);

export default router;
