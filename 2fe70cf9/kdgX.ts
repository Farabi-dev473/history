import {SlashCommandBuilder} from 'discord.js'

export default interface Command {
    data: SlashCommandBuilder,
    execute: () => void
}

