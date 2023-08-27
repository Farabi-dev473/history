import { AutoModerationActionExecution, SlashCommandBuilder } from "discord.js";
import Command from '../interfaces/command.js'

const imagineCommand: Command = {
   data: new SlashCommandBuilder()
                        .setName('imagine')
                        .setDescription('This command is used to generate images using AI'),
                        .addStringOption(option => option.setName('question').setDescription('Question to ask').setRequired(true)),
    async execute(interaction) {
        await interaction.reply("Ping!")
    },
}

export default imagineCommand