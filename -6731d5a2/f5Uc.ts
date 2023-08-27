import { REST, Routes } from 'discord.js';
import GlobalConfig from '../enums/GlobalConfig.js';

const rest = new REST({ version: GlobalConfig.REST_VERSION }).setToken(process.env.DISCORD_TOKEN as string);

const registerSlashCommands = async (commands: string[]) => {
    const data = await rest.put(
        Routes.applicationGuildCommands(process.env.DISCORD_CLIENT as string, process.env.DISCORD_GUILD as string),
        { body: commands },
      );
}

export default registerSlashCommands    