import {SlashCommandBuilder} from 'discord.js'

export default interface Command {
    data: any,
    execute: (interaction: any, question: string) => void
}

