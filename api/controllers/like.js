import jwt from "jsonwebtoken";
import { db } from "../config/db.js";
import { getToken } from "../utils/getToken.js";

// Get Likes
export const getLikes = (req, res) => {
	const q = "SELECT userId FROM likes WHERE postId = ?";

	db.query(q, [req.params.postId], (err, data) => {
		if (err) return res.status(500).json(err);
		return res.status(200).json(data.map((like) => like.userId));
	});
};

// Like And Unlike Post
export const addRemoveLike = (req, res) => {
	const token = getToken(req, res);

	if (!token)
		return res.status(500).json("Not authenticated. Authorization denied!");

	jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
		if (err) return res.status(500).json(err);

		if (userInfo) {
			const q = "SELECT * FROM likes WHERE userId=? AND postId=?";

			db.query(q, [userInfo.id, req.params.postId], (err, like) => {
				if (err) return res.status(500).json(err);

				if (like.length < 1) {
					const q = "INSERT INTO likes(`userId`,`postId`) VALUES(?)";

					const values = [userInfo.id, req.body.postId];

					db.query(q, [values], (err, data) => {
						if (err) return res.status(500).json(err);

						return res.status(200).json("Post has been liked.");
					});
				} else {
					const q = "DELETE FROM likes WHERE userId=? AND postId=?";

					db.query(q, [userInfo.id, req.body.postId], (err, data) => {
						if (err) return res.status(500).json(err);

						return res.status(200).json("Post has been disliked.");
					});
				}
			});
		}
	});
};
