import fs from 'node:fs'
import Command from '../interfaces/command'

const getCommands = () => {

    let commands: any[] = []

    const files = fs.readdirSync('./src/commands')
    console.log(files)
}

export default getCommands

getCommands()