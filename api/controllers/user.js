import jwt from "jsonwebtoken";
import { db } from "../config/db.js";
import bcrypt from "bcryptjs";
import { getToken } from "../utils/getToken.js";

// Get Logged In User
export const getUser = (req, res) => {
	const token = getToken(req, res);

	if (!token)
		return res.status(500).json("Not authenticated. Authorization denied!");

	jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
		if (err) return res.status(500).json(err);

		const q = "SELECT * FROM users WHERE id=?";

		db.query(q, [userInfo.id], (err, user) => {
			if (err) return res.status(500).json(err);

			return res.status(200).json(user[0]);
		});
	});
};

// Get User By Id
export const getUserById = (req, res) => {
	const token = getToken(req, res);

	if (!token)
		return res.status(500).json("Not authenticated. Authorization denied!");

	jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
		if (err) return res.status(500).json(err);

		if (userInfo) {
			const q = "SELECT * FROM users WHERE id=?";

			db.query(q, [req.params.id], (err, user) => {
				if (err) return res.status(500).json(err);

				if (user.length === 0) return res.status(404).json("User not found.");

				res.status(200).json(user[0]);
			});
		}
	});
};

// Update User
export const updateUser = async (req, res) => {
	const token = getToken(req, res);

	if (!token)
		return res.status(500).json("Not authenticated. Authorization denied!");

	jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
		if (err) return res.status(500).json(err);

		const userQuery = "SELECT * FROM users  WHERE id=?";

		db.query(userQuery, [userInfo.id], (err, user) => {
			if (err) return res.status(500).json(err);

			if (user.length > 0) {
				// const salt = bcrypt.genSaltSync(10);
				// const hash = bcrypt.hashSync(req.body.password, salt);

				const q =
					"UPDATE users SET `username`=?,`fullname`=?,`email`=?,`address`=?,`city`=?,`country`=?,`profilepic`=?,`coverpic`=?,`bio`=?,`phone`=? WHERE `id`=?";

				const values = [
					req.body.username || user[0].username,
					req.body.fullname || user[0].fullname,
					req.body.email || user[0].email,
					// hash || user[0].password,
					req.body.address || user[0].address,
					req.body.city || user[0].city,
					req.body.country || user[0].country,
					req.body.profilepic || user[0].profilepic,
					req.body.coverpic || user[0].coverpic,
					req.body.bio || user[0].bio,
					req.body.phone || user[0].phone,
				];

				db.query(q, [...values, userInfo.id], (err, data) => {
					if (err) return res.status(500).json(err);

					if (data.affectedRows > 0)
						return res.status(200).json("User updated");

					return res.status(401).json("You can only update your post.");
				});
			}
		});
	});
};
