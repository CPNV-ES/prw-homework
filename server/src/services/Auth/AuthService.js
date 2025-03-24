import DiscordApiService from "./DiscordApiService.js";
import UserService from "../UserService.js";
import TokenService from "./TokenService.js";

export default class AuthService {
  constructor() {
    this.discordApiService = new DiscordApiService();
    this.userService = new UserService();
    this.tokenService = new TokenService();
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
      const token = this.tokenService.generateToken({ userId: user.id });

      return {
        token,
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

  async verifyToken(token) {
    const decoded = this.tokenService.verifyToken(token);
    return this.userService.findById(decoded.userId);
  }
}
