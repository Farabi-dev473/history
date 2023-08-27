import dotenv from 'dotenv'
import {ButtonBuilder, Client, GatewayIntentBits, IntentsBitField, messageLink} from 'discord.js'

dotenv.config()

const client = new Client(
    {
        intents:[
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent,
            GatewayIntentBits.GuildMembers,
            GatewayIntentBits.DirectMessages
        ]
    }
)

const btn = new ButtonBuilder()

client.login(process.env.DISCORD_TOKEN)

client.on('messageCreate', async (message) => {
    console.log(message.content)
    message.channel("Hey dood, how is it going!")
})


