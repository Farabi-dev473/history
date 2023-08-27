import Command from '../interfaces/command'
declare global {
    namespace NodeJS {
      interface ImportMeta {
        glob: (pattern: string) => Record<string, () => Promise<{ default: any }>>
      }
    }
  }
  
const getCommands = async () => {
    let commands: Command[] = []

    // get the commands from each file inside command folder & push them into commands array
    const files = await import.meta.glob('./commands/*.js')
    for (const path in files) {
        const { default: command } = await files[path]()
        commands.push(command.data.toJSON())
    }

    return commands
}

export default getCommands
