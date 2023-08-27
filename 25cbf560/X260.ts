import { Field, Int } from 'type-graphql';

@Object()
class TwitterSpace {
  @Field()
  spaceId!: string;

  @Field(() => Int)
  minTime!: number;

  @Field(() => Int)
  numberOfWinners!: number;

  @Field()
  followHostRequired!: boolean;

  @Field(() => [User])
  users!: User[];

  @Field(() => String)
  prizeName!: string;

  @Field(() => [HoldingRequirement])
  holdingRequirements!: HoldingRequirement[];
}

enum Role {
  CO_HOST = 'CO-HOST',
  SPEAKER = 'SPEAKER',
  LISTENER = 'LISTENER',
}

@Object()
class User {
  @Field(() => Role)
  type!: Role;
}

@Object()
class HoldingRequirement {
  @Field(() => Int)
  numberOfNft!: number;

  @Field()
  collectionName!: string;

  @Field()
  trait!: string;
}

export { TwitterSpace, Role, User, HoldingRequirement };
