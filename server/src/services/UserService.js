import prisma from "../../prisma/prismaClient.js";
import { discordConfig } from "../config/discord.js";

export default class UserService {
  async findOrCreateDiscordUser(discordUser) {
    const avatarUrl = this.getDiscordAvatarUrl(discordUser);

    try {
      return await prisma.user.upsert({
        where: { discordId: discordUser.id },
        update: {
          email: discordUser.email,
          username: discordUser.username,
          avatar: avatarUrl,
        },
        create: {
          discordId: discordUser.id,
          email: discordUser.email,
          username: discordUser.username,
          avatar: avatarUrl,
        },
      });
    } catch (error) {
      throw new Error(`Database operation failed: ${error.message}`);
    }
  }

  getDiscordAvatarUrl(discordUser) {
    return discordConfig.api.avatarUrl(discordUser.id, discordUser.avatar);
  }

  async findById(id) {
    return prisma.user.findUnique({
      where: { id },
    });
  }
}
