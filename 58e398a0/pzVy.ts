import { AutoModerationActionExecution, Interaction, SlashCommandBuilder } from "discord.js";
import Command from '../interfaces/command.js'
import getAIGeneratedImage from "../services/getAIGeneratedImage.js";

const imagineCommand: Command = {
   data: new SlashCommandBuilder()
                        .setName('imagine')
                        .setDescription('This command is used to generate images using AI')
                        .addStringOption(option => option.setName('question').setDescription('Question to ask').setRequired(true)),

    async execute(interaction, question) {
        
        interaction.deferReply()
        const imgUrl = await getAIGeneratedImage(question)
        await interaction.channel.send({
            files: [{
                attachment: imgUrl
            }]
        })
        console.log("Hello World")
        await interaction.followUp({
            content: 'Here is your image',
            files: [{
                attachment: imgUrl
            }]
        })
    },
}

export default imagineCommand