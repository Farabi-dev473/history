import { SlashCommandBuilder } from "discord.js";

const imagineCommand = new SlashCommandBuilder()
                                    .setName('imagine')
                                    .setDescription('This command is used to generate images using AI');

export default imagineCommand