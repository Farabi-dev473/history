import {SlashCommandBuilder} from 'discord.js'

interface Command {
    data: SlashCommandBuilder,
    execute: () => void
}