import express from "express";
import AuthService from "../services/Auth/AuthService.js";
import { authConfig } from "../config/auth.js";

const router = express.Router();
const authService = new AuthService();

router.get("/discord/callback", async (req, res) => {
  try {
    const { code } = req.query;
    if (!code) {
      return res.status(400).json({ error: "No code provided" });
    }

    const authResult = await authService.handleDiscordAuth(code);

    res.cookie(
      authConfig.cookie.name,
      authResult.token,
      authConfig.cookie.options
    );

    res.json(authResult);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

router.get("/verify", async (req, res) => {
  try {
    const token = req.cookies[authConfig.cookie.name];

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    const user = await authService.verifyToken(token);

    if (!user) {
      return res.status(401).json({ error: "Invalid token" });
    }

    res.json(user);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

export default router;
