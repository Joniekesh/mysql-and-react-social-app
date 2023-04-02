import express from "express";
import { deleteAccount, login, register } from "../controllers/auth.js";

const router = express.Router();

router.post("/", register);
router.post("/login", login);
router.delete("/", deleteAccount);

export default router;
