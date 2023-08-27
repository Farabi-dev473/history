import fs from 'node:fs'
import Command from '../interfaces/command'

const getCommands = () => {
    
    let commands: any[] = []
    console.log("Hello")
    // get the commands from each file inside command folder & push them into commands array
    fs.readdirSync('./src/commands').forEach(async file => {
        console.log(__dirname)
        const command: Command = await import(`./commands/${file}.js`)
        console.log(command)
        commands.push(command.data.toJSON())    
    })
    return commands
}

export default getCommands