import jwt from "jsonwebtoken";
import { db } from "../config/db.js";
import { getToken } from "../utils/getToken.js";

// Add Story
export const createStory = (req, res) => {
	const token = getToken(req, res);

	if (!token)
		return res.status(500).json("Not authenticated. Authorization denied!");

	jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
		if (err) return res.status(500).json(err);

		const q = "INSERT INTO stories(`userId`,`image`,`video`) VALUES(?)";

		const values = [userInfo.id, req.body.image, req.body.video];

		db.query(q, [values], (err, story) => {
			if (err) return res.status(500).json(err);

			return res.status(200).json("Story created.");
		});
	});
};

// Get Stories
export const getStories = (req, res) => {
	const token = getToken(req, res);

	if (!token)
		return res.status(500).json("Not authenticated. Authorization denied!");

	jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
		if (err) return res.status(500).json(err);

		if (userInfo) {
			const q = `SELECT s.*, u.id AS userId, fullname, profilepic FROM stories AS s JOIN users AS u ON (u.id = s.userId) ORDER BY s.created_at DESC`;

			db.query(q, (err, stories) => {
				if (err) return res.status(500).json(err);

				res.status(200).json(stories);
			});
		}
	});
};
