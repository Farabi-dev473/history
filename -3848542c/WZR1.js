import {SlashCommandBuilder} from 'discord.js'

export default {
    data: new SlashCommandBuilder()
                       .setName('imagine')
                       .setDescription("Blah Blah Blah"),
    async execute(interaction){
       interaction.reply("Ping!")
    }
}