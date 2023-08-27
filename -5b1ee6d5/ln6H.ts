import askCommand from "../commands/ask.js"
import imagineCommand from "../commands/imagine.js"

const getCommands = () => {
    return [
        askCommand.data.toJSON(),
        imagineCommand.data.toJSON(),
    ]
}

export default getCommands