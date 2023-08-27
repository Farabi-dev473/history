import * as path from 'path';
import { buildSchema } from 'type-graphql';
import { AccountLinkingResolver } from '../resolvers/account-linking';
import { AddNftResolver } from '../resolvers/add-nft';
import { AlertResolver } from '../resolvers/alert';
import AttributeResolver from '../resolvers/attribute';
import { AuthResolver } from '../resolvers/auth';
import { DeeplinkingResolver } from '../resolvers/deeplinking';
import GetBlogsResolver from '../resolvers/get-blogs';
import GetTPSResolver from '../resolvers/get-tps';
import LiveFeed from '../resolvers/live-feed';
import { LogsResolver } from '../resolvers/logs';
import NftResolver from '../resolvers/nft';
import NftAutomated from '../resolvers/nft-automated';
import NftItemResolver from '../resolvers/nft-item';
import { PortfolioResolver } from '../resolvers/portfolio';
import { ReminderResolver } from '../resolvers/reminder';
import SalesResolver from '../resolvers/sales';
import StakingResolver from '../resolvers/staking';
import TokenResolver from '../resolvers/token';
import { TwitterSpaceGiveawayResover } from '../resolvers/twitterSpace';
import { UpdateNftResolver } from '../resolvers/update-nft';
import { VerifyRequestResolver } from '../resolvers/verify-request';
import { Web3Resolver } from '../resolvers/web3';
import { customAuthChecker } from '../utils/common-utils';
import { gqPubSub } from './gq-pubsub';

export async function getTypedSchema() {
  return await buildSchema({
    resolvers: [
      NftResolver,
      AuthResolver,
      AddNftResolver,
      UpdateNftResolver,
      LogsResolver,
      VerifyRequestResolver,
      AlertResolver,
      SalesResolver,
      GetTPSResolver,
      GetBlogsResolver,
      ReminderResolver,
      NftAutomated,
      Web3Resolver,
      DeeplinkingResolver,
      AccountLinkingResolver,
      LiveFeed,
      TokenResolver,
      StakingResolver,
      AttributeResolver,
      NftItemResolver,
      PortfolioResolver,
      TwitterSpaceGiveawayResover,
    ],
    validate: false,
    emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
    authChecker: customAuthChecker,
    pubSub: gqPubSub,
  });
}
