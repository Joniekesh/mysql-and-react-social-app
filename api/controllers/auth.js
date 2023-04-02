import { db } from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getToken } from "../utils/getToken.js";

// Register
export const register = (req, res) => {
	const q = "SELECT * FROM `users` WHERE email=?";

	db.query(q, [req.body.email], (err, user) => {
		if (err) return res.status(500).json(err);

		if (user.length) {
			return res
				.status(409)
				.json(`A user with email: ${user[0].email} already exist!`);
		}

		const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(req.body.password, salt);

		const q =
			"INSERT INTO users(`username`,`fullname`,`email`,`password`) VALUES (?)";

		const values = [req.body.username, req.body.fullname, req.body.email, hash];

		db.query(q, [values], (err, user) => {
			if (err) return res.status(500).json(err);

			res.json("Account created.");
		});
	});
};

// Login
export const login = (req, res) => {
	const q = "SELECT * FROM `users` WHERE email=?";

	db.query(q, [req.body.email], (err, user) => {
		if (err) return res.status(500).json(err);

		if (user.length === 0) {
			return res.status(409).json("Invalid email or password!");
		}

		const isMatch = bcrypt.compareSync(req.body.password, user[0].password);

		if (!isMatch) return res.status(400).json("Invalid email or password!");

		const token = jwt.sign({ id: user[0].id }, process.env.JWT_SECRET);

		const { password, ...others } = user[0];

		res.status(200).json({ user: others, token });
	});
};

// Delete Account
export const deleteAccount = (req, res) => {
	const token = getToken(req, res);
	if (!token)
		return res.status(500).json("Not authenticated. Authorization denied!");

	jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
		if (err) return res.status(500).json(err);

		const q = "DELETE  FROM users WHERE id=?";

		db.query(q, [userInfo.id], (err, user) => {
			if (err) return res.status(500).json(err);

			return res.status(200).json("Account Deleted!");
		});
	});
};
