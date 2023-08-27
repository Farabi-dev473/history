import { Field, InputType, ObjectType } from 'type-graphql';
import { Alert } from './Alert';
import { BookmarkNFT } from './BookmarkNFT';
import { Device } from './Device';
import { Reminder } from './Reminder';

@ObjectType('Wallet')
export class Wallet {
  @Field()
  id!: string;

  @Field({ nullable: true })
  address!: string;
}

@ObjectType('User')
export class User {
  @Field()
  id!: string;

  @Field({ nullable: true })
  email!: string;

  @Field({ nullable: true })
  password?: string;

  @Field()
  role?: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  showProfile?: boolean;

  @Field({ nullable: true })
  hasRequiredDiscordPermission?: boolean;

  @Field({ nullable: true })
  userName!: string;

  @Field({ nullable: true })
  avatar?: string;

  @Field({ nullable: true })
  bio?: string;

  @Field({ nullable: true })
  token?: string;

  @Field({ nullable: true })
  moonlyMints?: string;

  @Field({ nullable: true })
  walletAddress!: string;

  @Field(() => Wallet, { nullable: true })
  primaryWallet!: Wallet;

  @Field({ nullable: true })
  discordUserId!: string;

  @Field(() => [Alert], { nullable: true })
  alerts!: Alert[];

  @Field(() => [Reminder], { nullable: true })
  reminders!: Reminder[];

  @Field(() => [BookmarkNFT], { nullable: true })
  bookmarkedNfts!: BookmarkNFT[];

  @Field(() => [Device], { nullable: true })
  devices!: Device[];

  @Field(() => Alert, { nullable: true })
  autoAlert!: Alert;

  @Field(() => [Wallet], { nullable: true })
  wallets!: Wallet[];

  @Field({ nullable: true })
  twitterUserId?: string;

  @Field({ nullable: true })
  twitterUserName?: string;

  @Field({ nullable: true })
  twitterDisplayName?: string;

  @Field({ nullable: true })
  twitterTokenExpireTime?: string;
}

@ObjectType('AuthCheckPayload')
export class AuthCheckPayload {
  @Field(() => Boolean)
  isAuthenticated!: boolean;
}

@InputType('UserInput')
export class UserInput {
  @Field()
  email!: string;
  @Field()
  password!: string;
}

@InputType('UserSaveInput')
export class UserSaveInput {
  @Field({ nullable: true })
  email!: string;
  @Field({ nullable: true })
  name!: string;
}

@ObjectType('LinkPayload')
export class LinkPayload {
  @Field(() => Boolean, { nullable: true })
  isLinked?: boolean;

  @Field(() => Boolean, { nullable: true })
  mergeable?: boolean;
}
