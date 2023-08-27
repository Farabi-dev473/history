import { REST, Routes } from 'discord.js';

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN as string);

const registerSlashCommands = async (commands: string[]) => {
    const data = await rest.put(
        Routes.applicationGuildCommands(process.env.DISCORD_CLIENT as string, process.env.DISCORD_GUILD as string),
        { body: commands },
      );
}

export default registerSlashCommands    