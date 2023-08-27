import { ArrayMinSize, Length } from 'class-validator';
import {
  Field,
  InputType,
  Int,
  ObjectType,
  registerEnumType,
} from 'type-graphql';

@ObjectType('GiveawayInput')
@InputType()
class GiveawayInput {
  @Field(() => String)
  @Length(5, 15)
  spaceId!: string;

  @Field(() => Int)
  @Length(1, 6)
  minTimeInSec!: number;

  @Field(() => Int)
  @Length(1, 2)
  numberOfWinners!: number;

  @Field()
  followHostRequired!: boolean;

  @Field(() => [Role])
  @ArrayMinSize(1)
  eligableUserTypes!: Role[];

  @Field(() => String)
  @Length(1, 20)
  prizeName!: string;

  @Field(() => [HoldingRequirementInput])
  holdingRequirements!: HoldingRequirementInput[];
}

enum Role {
  CO_HOST = 'CO_HOST',
  SPEAKER = 'SPEAKER',
  LISTENER = 'LISTENER',
}
registerEnumType(Role, {
  name: 'Role', // The name should match the enum's name
});

@ObjectType('HoldingRequirementInput')
@InputType()
class HoldingRequirementInput {
  @Field(() => Int)
  numOfNFT!: number;

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

export { TwitterSpace, Role, HoldingRequirementInput, Winner };
