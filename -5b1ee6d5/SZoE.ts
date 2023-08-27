import fs from 'node:fs'
import Command from '../interfaces/command'

const getCommands = () => {
    let commands: Command[] = []

    fs.readdirSync('./src/commands').forEach(file => {
        const command = require(`./commands/${file}.js`)
        commands.push(command.data.toJSON())    
    })
    
    return commands
}