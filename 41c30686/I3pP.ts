import 'reflect-metadata';

import { ApolloServer } from 'apollo-server-express';
import { execute, subscribe } from 'graphql';
import { createServer } from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';

import './queues';

import { createExpressApp } from './config/createExpressApp';
import { getTypedSchema } from './config/entry-resolver';
import { getPrisma } from './config/prisma';
import { addSearchMiddlewares, proxySearchToServer } from './utils/search';

async function main() {
  const app = createExpressApp();
  const schema = await getTypedSchema();
  const prisma = getPrisma();
  const httpServer = createServer(app);

  // add search middlewares
  addSearchMiddlewares(prisma);
  app.post('/search/indexes/nft/search', (...args) => {
    proxySearchToServer(args[0])(...args);
  });

  const subscriptionServer = new SubscriptionServer(
    {
      execute,
      subscribe,
      schema,
      keepAlive: 10_000,
    },
    {
      server: httpServer,
      path: '/subscriptions',
    }
  );

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => ({
      req,
      res,
      prisma,
      user: req.user,
    }),
    plugins: [
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close();
            },
          };
        },
      },
    ],
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path: '/graphql' });

  const port = process.env.PORT || 4000;
  httpServer.listen(port, () => {
    console.log(`server is running on http://localhost:${port}/graphql`);
  });
}

main().catch((e) => {
  console.log(e);
});
