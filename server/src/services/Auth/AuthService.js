import DiscordApiService from "./DiscordApiService.js";
import UserService from "../UserService.js";

export default class AuthService {
  constructor() {
    this.discordApiService = new DiscordApiService();
    this.userService = new UserService();
  }

  async handleDiscordAuth(code) {
    try {
      const tokenData = await this.discordApiService.exchangeCodeForToken(code);
      if (!tokenData.access_token) {
        throw new Error("No access token received");
      }

      const userInfo = await this.discordApiService.getUserInfo(
        tokenData.access_token
      );
      if (!userInfo.id) {
        throw new Error("No user info received");
      }

      const user = await this.userService.findOrCreateDiscordUser(userInfo);

      return {
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          avatar: user.avatar,
        },
      };
    } catch (error) {
      throw new Error(`Authentication failed: ${error.message}`);
    }
  }
}
