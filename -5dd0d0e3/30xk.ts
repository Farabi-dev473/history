import { SlashCommandBuilder } from "discord.js";

const askCommand = new SlashCommandBuilder()
                                    .setName('ask')
                                    .setDescription('This command is used to get quote using AI');

export default askCommand