import dotenv from 'dotenv'
import {ButtonBuilder, Client, Collection, GatewayIntentBits, IntentsBitField, messageLink} from 'discord.js'
import imaginecommand from './commands/imagine.js'

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

client.login(process.env.DISCORD_TOKEN)

client.on('messageCreate', async (message) => {
    console.log(message.content)
    message.channel.send("Hey dood, how is it going!")
})

client.commands = new Collection()


