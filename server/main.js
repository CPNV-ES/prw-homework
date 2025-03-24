import app from "./src/app.js";
import {discordNotification} from "./src/services/DiscordNotification.js";
import {discordConfig} from "./src/config/discord.js";

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  try {
    await discordNotification.initialize(discordConfig.token);
    discordNotification.startScheduler();
    console.log('Discord notification service initialized successfully');
  } catch (error) {
    console.error('Failed to initialize Discord notification service:', error);
  }
});
