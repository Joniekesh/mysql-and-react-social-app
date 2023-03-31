import express from "express";
import { deleteAccount, login, logout, register } from "../controllers/auth.js";

const router = express.Router();

router.post("/", register);
router.post("/login", login);
router.post("/logout", logout);
router.delete("/", deleteAccount);

export default router;
