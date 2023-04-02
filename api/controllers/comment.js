import { db } from "../config/db.js";
import jwt from "jsonwebtoken";
import { getToken } from "../utils/getToken.js";

// Add Comment
export const getComments = (req, res) => {
	const token = getToken(req, res);

	if (!token)
		return res.status(500).json("Not authenticated. Authorization denied!");

	jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
		if (err) return res.status(500).json(err);

		const q =
			"SELECT c.*,u.id AS userId,fullname,profilepic FROM comments AS c JOIN users AS u ON (u.id = c.userId) WHERE c.postId=? ORDER BY created_at DESC";

		db.query(q, [req.params.id], (err, comments) => {
			if (err) return res.status(500).json(err);

			return res.status(200).json(comments);
		});
	});
};

// Add Comment
export const addComment = (req, res) => {
	const token = getToken(req, res);

	if (!token)
		return res.status(500).json("Not authenticated. Authorization denied!");

	jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
		if (err) return res.status(500).json(err);

		const q = "INSERT INTO comments (`text`, `userId`, `postId`) VALUES(?)";

		const values = [req.body.text, userInfo.id, req.body.postId];

		db.query(q, [values], (err, comment) => {
			if (err) return res.status(500).json(err);

			return res.status(200).json("Comment Added.");
		});
	});
};

//  Update Comment
export const updateComment = (req, res) => {
	const token = getToken(req, res);

	if (!token)
		return res.status(500).json("Not authenticated. Authorization denied!");

	jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
		if (err) return res.status(500).json(err);

		const commentId = req.params.id;

		const commentQuery = "SELECT * FROM comments WHERE id=?";

		db.query(commentQuery, [commentId], (err, comment) => {
			if (err) return res.status(500).json(err);

			if (comment.length === 0)
				return res.status(404).json("Comment not found.");

			if (comment[0].userId !== userInfo.id)
				return res.status(401).json("You can only update your comment.");

			const q = "UPDATE comments SET `text`=? WHERE `id`=? AND `userId`=?";

			const values = [req.body.text];

			db.query(q, [...values, commentId, userInfo.id], (err, comment) => {
				if (err) return res.status(500).json(err);

				return res.status(200).json("Comment updated.");
			});
		});
	});
};

// Delete Comment
export const deleteComment = (req, res) => {
	const token = getToken(req, res);

	if (!token)
		return res.status(500).json("Not authenticated. Authorization denied!");

	jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
		if (err) return res.status(500).json(err);

		const q = "DELETE  FROM comments WHERE id=?  AND userId=?";

		db.query(q, [req.params.id, userInfo.id], (err, data) => {
			if (err) return res.status(500).json(err);

			if (data.affectedRows > 0)
				return res.status(200).json("Comment Deleted!");

			return res.status(401).json("You can delete only your comment.");
		});
	});
};
