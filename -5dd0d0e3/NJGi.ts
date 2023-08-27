import { AutoModerationActionExecution, SlashCommandBuilder } from "discord.js";
import Command from '../interfaces/command.js'
import getAIGeneratedQuote from '../services/getAIGeneratedQuote.js'

const askCommand: Command = {
   data: new SlashCommandBuilder()
                        .setName('ask')
                        .setDescription('This command is used to get quote using AI')
                        .addStringOption(option => option.setName('question').setDescription('Question to ask').setRequired(true)),
    async execute(interaction: any, question: string) {
       await interaction.reply(await getAIGeneratedQuote(interaction.options.getString('question')))        
    },
}

export default askCommand