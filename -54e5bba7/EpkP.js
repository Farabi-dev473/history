import dotenv from 'dotenv'
import {ButtonBuilder, Events,Client, Collection, GatewayIntentBits, IntentsBitField, messageLink} from 'discord.js'
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

client.commands = new Collection()
client.commands.set(imaginecommand.data.name, imaginecommand)


client.login(process.env.DISCORD_TOKEN)

client.on('messageCreate', async (message) => {
    console.log(message.content)
    message.channel.send("Hey dood, how is it going!")
})

client.on(Events.InteractionCreate, async (interaction) => {
     if(!interaction.isChatInputCommand()) return 
     const command = interaction.client.commands.get(interaction.commandName)
     await command.execute()
})



