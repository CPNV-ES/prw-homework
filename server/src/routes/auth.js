import express from "express";
import AuthService from "../services/Auth/AuthService.js";
import { authConfig } from "../config/auth.js";
import { discordConfig } from "../config/discord.js";

const router = express.Router();
const authService = new AuthService();

router.get("/discord", (req, res) => {
  const authUrl = new URL("https://discord.com/api/oauth2/authorize");
  authUrl.searchParams.append("client_id", discordConfig.clientId);
  authUrl.searchParams.append("redirect_uri", discordConfig.redirectUri);
  authUrl.searchParams.append("response_type", "code");
  authUrl.searchParams.append("scope", discordConfig.scope);

  res.redirect(authUrl.toString());
});

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

router.get("/logout", (req, res) => {
  res.clearCookie(authConfig.cookie.name, authConfig.cookie.options);
  res.json({ success: true, message: "Logged out successfully" });
});

export default router;
