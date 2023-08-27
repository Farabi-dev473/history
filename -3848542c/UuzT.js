import {SlashCommandBuilder} from 'discord.js'

export default {
    data: new SlashCommandBuilder()
                       .setName('imagine')
                       .setDescription("Blah Blah Blah"),
    execute: async(interaction) => {
         await interaction.reply()
    }
}