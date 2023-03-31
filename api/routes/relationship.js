import express from "express";
import {
	followUnfollowUser,
	getFollowings,
} from "../controllers/relationship.js";
const router = express.Router();

router.post("/:userId", followUnfollowUser);
router.get("/:followedUserId", getFollowings);

export default router;
