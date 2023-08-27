import askCommand from "../commands/ask"
import imagineCommand from "../commands/imagine"

const getCommands = () => {
    return [
        askCommand,
        imagineCommand
    ]
}

export default getCommands