import fs from 'node:fs'
import Command from '../interfaces/command'

const getCommands = () => {
    let commands: any[] = []
    // let command: Command
    // get the commands from each file inside command folder & push them into commands array
    fs.readdirSync('./src/commands').forEach(async file => {
        const command: Command = await import(`./commands/${file}.js`)
        commands.push(command.data.toJSON())    
    })
    
    return commands
}

export default getCommands