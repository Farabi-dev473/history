import { Client, GatewayIntentBits } from 'discord.js'
import dotenv from 'dotenv'
dotenv.config()

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
	],
});

client.on('messageCreate', (message) => {
    console.log(message)
})

client.login(process.env.DISCORD_TOKEN)