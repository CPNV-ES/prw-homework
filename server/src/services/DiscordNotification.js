import {Client, GatewayIntentBits} from 'discord.js';
import cron from 'node-cron';
import prisma from '../../prisma/prismaClient.js';

class DiscordNotificationService {
    constructor() {
        this.client = new Client({
            intents: [GatewayIntentBits.Guilds, GatewayIntentBits.DirectMessages]
        });

        this.client.on('ready', () => {
            console.log(`Logged in as ${this.client.user.tag}!`);
        });
    }

    async initialize(token) {
        await this.client.login(token);
    }

    async sendDirectMessage(discordId, message) {
        try {
            const user = await this.client.users.fetch(discordId);
            if (user) {
                await user.send(message);
                return true;
            }
        } catch (error) {
            console.error(`Failed to send DM to user ${discordId}:`, error);
            return false;
        }
        return false;
    }

    async checkDeadlines() {
        const now = new Date();

        // Récupérer tous les utilisateurs
        const users = await prisma.user.findMany();

        for (const user of users) {
            // Récupérer les devoirs non notifiés pour chaque utilisateur
            const assignments = await prisma.homework.findMany({
                where: {
                    deadline: {
                        gt: now
                    },
                    notificationSent: false
                },
                include: {
                    Subject: true
                }
            });

            for (const assignment of assignments) {
                const deadlineDate = new Date(assignment.deadline);
                const timeUntilDeadline = deadlineDate - now;
                const hoursUntilDeadline = timeUntilDeadline / (1000 * 60 * 60);

                if (hoursUntilDeadline <= assignment.notificationThreshold) {
                    const message = `⚠️ Rappel: Le devoir "${assignment.title}" pour le cours ${assignment.Subject?.name || 'sans cours'} arrive à échéance dans ${Math.round(hoursUntilDeadline)} heures!`;

                    const messageSent = await this.sendDirectMessage(user.discordId, message);

                    if (messageSent) {
                        await prisma.homework.update({
                            where: {id: assignment.id},
                            data: {notificationSent: true}
                        });
                    }
                }
            }
        }
    }

    startScheduler() {
        cron.schedule('0 * * * *', async () => {
            await this.checkDeadlines();
        });
    }
}

export const discordNotification = new DiscordNotificationService(); 