import askCommand from "../commands/ask.js"
import imagineCommand from "../commands/imagine.js"

const getCommands = () => {
    return [
        askCommand,
        imagineCommand
    ]
}

export default getCommands