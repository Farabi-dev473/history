import { ArrayMinSize, Length } from 'class-validator';
import { Field, Int, ObjectType, registerEnumType } from 'type-graphql';

@ObjectType('TwitterSpace')
class TwitterSpace {
  @Field(() => String)
  @Length(5, 10)
  spaceId!: string;

  @Field(() => Int)
  @Length(1, 6)
  minTimeInSec!: number;

  @Field(() => Int)
  @Length(1, 2)
  numberOfWinners!: number;

  @Field()
  followHostRequired!: boolean;

  @Field(() => [User])
  @ArrayMinSize(1)
  eligableUserTypes!: User[];

  @Field(() => String)
  @Length(1, 20)
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

@ObjectType('Winner')
class Winner {
  @Field(() => String)
  username!: string;

  @Field(() => String)
  avatarUrl!: string;
}

export { TwitterSpace, Role, User, HoldingRequirement, Winner };
