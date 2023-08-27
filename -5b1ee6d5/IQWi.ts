import fs from 'node:fs'
import Command from '../interfaces/command'

const getCommands = async () => {

    let commands: any[] = []
    const files = fs.readdirSync('./src/commands')

    files.forEach(async(file) => {
        console.log(await import(file))
    })
    
}

export default getCommands

getCommands()