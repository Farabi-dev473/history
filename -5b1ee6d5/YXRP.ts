import fs from 'node:fs'
import Command from '../interfaces/command'

const getCommands = () => {
    
    let commands: any[] = []
    console.log("Hello")
    // get the commands from each file inside command folder & push them into commands array
    fs.readdirSync('./src/commands').forEach(async file => {
        const path = process.cwd() + '/src/commands/' + file
        const command: Command = await import(path)
        console.log(command)
        commands.push(command.data.toJSON())    
    })
    console.log(commands)
    return commands
}

export default getCommands