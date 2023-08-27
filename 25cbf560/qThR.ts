import { Field, Int, ObjectType } from 'type-graphql';

@ObjectType()
class TwitterSpace {
  @Field()
  spaceId!: string;

  @Field((type) => Int)
  minTime!: number;

  @Field()
  timeFormat!: string;

  @Field((type) => Int)
  numberOfWinners!: number;

  @Field()
  followHostRequired!: boolean;

  @Field((type) => [User])
  userTypes!: User[];

  @Field((type) => [HoldingRequirement])
  holdingRequirements!: HoldingRequirement[];
}

enum Role {
  CO_HOST = 'CO-HOST',
  SPEAKER = 'SPEAKER',
  LISTENER = 'LISTENER',
}

@ObjectType()
class User {
  @Field((type) => Role)
  type!: Role;
}

@ObjectType()
class HoldingRequirement {
  @Field((type) => Int)
  numberOfNft!: number;

  @Field()
  collectionName!: string;

  @Field()
  trait!: string;
}

export { TwitterSpace, Role, User, HoldingRequirement };
