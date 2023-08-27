import { Field, Int, ObjectType, registerEnumType } from 'type-graphql';

@ObjectType('TwitterSpace')
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
  userTypes!: User[];

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
registerEnumType(Role, {
  name: 'Role', // The name should match the enum's name
});
@ObjectType('TwitterUserType')
class User {
  @Field(() => Role)
  role!: Role;
}

@ObjectType('HoldingRequirement')
class HoldingRequirement {
  @Field(() => Int)
  numberOfNft!: number;

  @Field()
  collectionName!: string;

  @Field()
  trait!: string;
}

export { TwitterSpace, Role, User, HoldingRequirement };
