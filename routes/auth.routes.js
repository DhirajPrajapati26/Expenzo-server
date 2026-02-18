import express from "express";
import AuthMiddleware from "../middleware/AuthMiddleware.js";
import { login, signup, logout, getMe } from "../controllers/auth.ctrl.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.get("/me", AuthMiddleware, getMe);

export default router;
