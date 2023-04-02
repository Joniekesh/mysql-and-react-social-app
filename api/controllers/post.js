import jwt from "jsonwebtoken";
import { db } from "../config/db.js";
import { getToken } from "../utils/getToken.js";

// Create Post
export const createPost = (req, res) => {
	const token = getToken(req, res);

	if (!token)
		return res.status(500).json("Not authenticated. Authorization denied!");

	jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
		if (err) return res.status(500).json(err);

		const q = "INSERT INTO posts(`description`, `img`, `userId`) VALUES(?)";

		const values = [req.body.description, req.body.img, userInfo.id];

		db.query(q, [values], (err, post) => {
			if (err) return res.status(500).json(err);

			return res.status(200).json("Post Created.");
		});
	});
};

// Get All Posts
export const getPosts = (req, res) => {
	const userId = req.query.userId;
	const token = getToken(req, res);

	if (!token)
		return res.status(500).json("Not authenticated. Authorization denied!");

	jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
		if (err) return res.status(500).json(err);

		if (userInfo) {
			const q = `SELECT p.*, u.id AS userId, fullname, profilepic FROM posts AS p JOIN users AS u ON (u.id = p.userId) ORDER BY p.created_at DESC`;

			db.query(q, (err, posts) => {
				if (err) return res.status(500).json(err);

				res.status(200).json(posts);
			});
		}
	});
};

// Get All Posts
export const getTimeLinePosts = (req, res) => {
	const userId = req.query.userId;
	const token = getToken(req, res);

	if (!token)
		return res.status(500).json("Not authenticated. Authorization denied!");

	jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
		if (err) return res.status(500).json(err);

		if (userInfo) {
			const q = `SELECT p.*, u.id AS userId, fullname, profilepic FROM posts AS p JOIN users AS u ON (u.id = p.userId) LEFT JOIN relationships AS r ON (p.userId = r.followedUserId) WHERE r.followerUserId= ? OR p.userId =? ORDER BY p.created_at DESC`;

			db.query(q, [userInfo.id, userInfo.id], (err, posts) => {
				if (err) return res.status(500).json(err);

				res.status(200).json(posts);
			});
		}
	});
};

// Get A Single Post
export const getPost = (req, res) => {
	const token = getToken(req, res);

	if (!token)
		return res.status(500).json("Not authenticated. Authorization denied!");

	jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
		if (err) return res.status(500).json(err);

		if (userInfo) {
			const q = "SELECT * FROM posts WHERE id=?";

			db.query(q, [req.params.id], (err, post) => {
				if (err) return res.status(500).json(err);

				if (post.length === 0) return res.status(404).json("Post not found.");

				res.status(200).json(post[0]);
			});
		}
	});
};

// Update Post
export const updatePost = (req, res) => {
	const token = getToken(req, res);

	if (!token)
		return res.status(500).json("Not authenticated. Authorization denied!");

	jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
		if (err) return res.status(500).json(err);

		const postId = req.params.id;

		const postQuery = "SELECT * FROM posts WHERE id=?";

		db.query(postQuery, [postId], (err, post) => {
			if (err) return res.status(500).json(err);

			if (post.length === 0) return res.status(404).json("Post not found.");

			if (post[0].userId !== userInfo.id)
				return res.status(401).json("You can only update your post.");

			const q =
				"UPDATE posts SET `description`=?, `img`=? WHERE `id`=? AND `userId`=?";

			const values = [
				req.body.description || post.description,
				req.body.img || post.img,
			];

			db.query(q, [...values, postId, userInfo.id], (err, post) => {
				if (err) return res.status(500).json(err);

				return res.status(200).json("Post updated.");
			});
		});
	});
};

// Delete Post
export const deletePost = (req, res) => {
	const token = getToken(req, res);

	if (!token)
		return res.status(500).json("Not authenticated. Authorization denied!");

	jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
		if (err) return res.status(500).json(err);

		const q = "DELETE  FROM posts WHERE id=?  AND userId=?";

		db.query(q, [req.params.id, userInfo.id], (err, data) => {
			if (err) return res.status(500).json(err);

			if (data.affectedRows > 0)
				return res.status(200).json("Account Deleted!");

			return res.status(401).json("You can delete only your post.");
		});
	});
};
