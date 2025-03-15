import express from "express";
import AuthService from "../services/Auth/AuthService.js";

const router = express.Router();
const authService = new AuthService();

router.get("/discord/callback", async (req, res) => {
  try {
    const { code } = req.query;
    if (!code) {
      return res.status(400).json({ error: "No code provided" });
    }

    const authResult = await authService.handleDiscordAuth(code);
    res.json(authResult);
  } catch (error) {
    console.error("Auth route error:", error);
    res.status(401).json({ error: "Authentication failed" });
  }
});
export default router;
