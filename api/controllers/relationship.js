import jwt from "jsonwebtoken";
import { db } from "../config/db.js";
import { getToken } from "../utils/getToken.js";

// Get Followers
export const getFollowings = (req, res) => {
	const q = "SELECT followerUserId FROM relationships WHERE followedUserId = ?";

	db.query(q, [req.params.followedUserId], (err, data) => {
		if (err) return res.status(500).json(err);
		return res
			.status(200)
			.json(data.map((relationship) => relationship.followerUserId));
	});
};

// Follow And UnFollow User
export const followUnfollowUser = (req, res) => {
	const token = getToken(req, res);

	if (!token)
		return res.status(500).json("Not authenticated. Authorization denied!");

	jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
		if (err) return res.status(500).json(err);

		if (userInfo) {
			const q =
				"SELECT * FROM relationships WHERE followerUserId=? AND followedUserId=?";

			db.query(q, [userInfo.id, req.params.userId], (err, relationship) => {
				if (err) return res.status(500).json(err);

				if (relationship.length < 1) {
					const q =
						"INSERT INTO relationships(`followerUserId`,`followedUserId`) VALUES(?)";

					const values = [userInfo.id, req.body.userId];

					db.query(q, [values], (err, data) => {
						if (err) return res.status(500).json(err);

						return res.status(200).json("User has been followed.");
					});
				} else {
					const q =
						"DELETE FROM relationships WHERE followerUserId=? AND followedUserId=?";

					db.query(q, [userInfo.id, req.body.userId], (err, data) => {
						if (err) return res.status(500).json(err);

						return res.status(200).json("User has been unfollowed.");
					});
				}
			});
		}
	});
};
