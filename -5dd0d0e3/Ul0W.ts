import { AutoModerationActionExecution, SlashCommandBuilder } from "discord.js";
import Command from '../interfaces/command.js'
import getAIGeneratedQuote from '../services/getAIGeneratedQuote.js'

const askCommand: Command = {
   data: new SlashCommandBuilder()
                        .setName('ask')
                        .setDescription('This command is used to get quote using AI'),

    async execute(interaction) {
      console.log(interaction.options.commandName)
      console.log(interaction)
       await interaction.reply(await getAIGeneratedQuote(interaction.options.getString('prompt')))        
    },
}

export default askCommand