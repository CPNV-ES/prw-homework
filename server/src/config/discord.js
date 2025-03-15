export const discordConfig = {
  clientId: process.env.DISCORD_CLIENT_ID,
  clientSecret: process.env.DISCORD_CLIENT_SECRET,
  redirectUri: "http://localhost:3000/auth/discord/callback",
  scope: "identify email",
  api: {
    tokenUrl: "https://discord.com/api/oauth2/token",
    userInfoUrl: "https://discord.com/api/users/@me",
    avatarUrl: (userId, avatarHash) =>
      `https://cdn.discordapp.com/avatars/${userId}/${avatarHash}.png`,
  },
};
