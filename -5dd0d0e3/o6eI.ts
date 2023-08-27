import { AutoModerationActionExecution, SlashCommandBuilder } from "discord.js";
import Command from '../interfaces/command.js'
import getAIGeneratedQuote from '../services/getAIGeneratedQuote.js'

const askCommand: Command = {
   data: new SlashCommandBuilder()
                        .setName('ask')
                        .setDescription('This command is used to get quote using AI')
                        .addStringOption(option => option.setName('question').setDescription('Question to ask').setRequired(true)),
                        
    async execute(interaction, question: string) {
      await interaction.deferReply()
      await interaction.followUp(await getAIGeneratedQuote(question))        
    },
}

export default askCommand