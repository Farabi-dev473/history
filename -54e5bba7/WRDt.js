import dotenv from 'dotenv'
import {Client, GatewayIntentBits, IntentsBitField, messageLink} from 'discord.js'

dotenv.config()

const client = new Client(
    {
        intents:[
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.GuildMembers,
            GatewayIntentBits.DirectMessages
        ]
    }
)

client.login(process.env.DISCORD_TOKEN)

client.on('messageCreate', async (message) => {
    console.log(message)
})

