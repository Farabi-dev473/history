import { Client, Events, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import getCommands from './src/utils/getCommands.js';
import slashCommandHandler from './src/handlers/slashCommandHandler.js';
import messageCreateHandler from './src/handlers/messageCreateHandler.js';
import registerSlashCommands from './src/services/registerSlashCommands.js';
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from './src/graphqlSchema.js';
import resolvers from './src/resolvers.js';
const prisma = new PrismaClient();
dotenv.config();
const init = async () => {
    // initialize discord client with intents
    const client = new Client({
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent
        ]
    });
    // Get commands & register them in discord server
    const commands = getCommands();
    registerSlashCommands(commands);
    // Slash Command Handler
    client.on(Events.InteractionCreate, slashCommandHandler);
    // Message Creation Handler
    client.on("messageCreate", messageCreateHandler);
    // Login to discord server
    client.login(process.env.DISCORD_TOKEN);
};
init();
const app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true,
    rootValue: resolvers
}));
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
export { prisma };
