import 'reflect-metadata';

import { createServer } from 'http';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { ApolloServer } from 'apollo-server-express';

import './queues';

import { getPrisma } from './config/prisma';
import { createExpressApp } from './config/createExpressApp';
import { getTypedSchema } from './config/entry-resolver';
import { addSearchMiddlewares, proxySearchToServer } from './utils/search';
import * as passport from 'passport'
import * as TwitterStrategy from 'passport-twitter'
import * as cookieSession from 'cookie-session'
import { User } from '@prisma/client';

async function main() {
  const app = createExpressApp();
  const schema = await getTypedSchema();
  const prisma = getPrisma();
  const httpServer = createServer(app);
  console.log(passport)
  passport.serializeUser(function (user: any, done: Function) {
    done(null, user.id);
  });
  passport.deserializeUser(async function (id: string, done: Function) {
    const user = await prisma.user.findFirst({
      where: {
        id,
      }
    })

    done(null, user)
  });

  passport.use(
    new TwitterStrategy(
      {
        clientType: 'confidential', //depends on your Twitter app settings, valid values are `confidential` or `public`
        clientID: process.env.TWITTER_CONSUMER_KEY,
        clientSecret: process.env.TWITTER_CONSUMER_SECRET,
        callbackURL: process.env.TWITTER_CALLBACK_URL,
      },
      async function (accessToken: string, refreshToken: string, profile: any, done: Function) {
        let user
        try{
          user = await prisma.user.findFirst({
            where: {
              twitterId: profile.id
            }
          })
  
          if(!user?.id) {
            user = await prisma.user.create({
              data: {
                twitterId: profile.id,
                twitterUserName: profile.username,
                twitterDisplayName: profile.displayName,
                twiterProfileImgUrl: profile._json.profile_image_url,
                twitterAccessToken: accessToken,
                twitterRefreshToken: refreshToken
              }
            })
          }
          done(null, user)
        }catch(err) {
          done(err, user)
        }
      }
    )
  );

  app.use(cookieSession({
    maxAge: 100000,
    keys: ["HELLO WORLD"]
  }))

  app.use(passport.initialize());
  app.use(passport.session())

  app.get(
    '/auth/twitter',
    passport.authenticate('twitter', {
      // <6> Scopes
      scope: ['tweet.read', 'users.read', 'offline.access'],
    })
  );

  app.get(
    '/auth/twitter/callback',
    passport.authenticate('twitter'),
    function (req, res) {
      res.redirect('http://localhost:4000/')
    }
  );
  
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
