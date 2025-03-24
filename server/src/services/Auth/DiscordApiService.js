import { discordConfig } from "../../config/discord.js";

export default class DiscordApiService {
  async exchangeCodeForToken(code) {
    const params = new URLSearchParams({
      client_id: discordConfig.clientId,
      client_secret: discordConfig.clientSecret,
      code,
      grant_type: "authorization_code",
      redirect_uri: discordConfig.redirectUri,
      scope: discordConfig.scope,
    });

    try {
      const response = await fetch(discordConfig.api.tokenUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error_description || "Token exchange failed");
      }

      return response.json();
    } catch (error) {
      throw new Error(`Token exchange failed: ${error.message}`);
    }
  }

  async getUserInfo(accessToken) {
    try {
      const response = await fetch(discordConfig.api.userInfoUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error("Failed to get user info: " + error.message);
      }

      return response.json();
    } catch (error) {
      throw new Error(`Failed to get user info: ${error.message}`);
    }
  }
}
