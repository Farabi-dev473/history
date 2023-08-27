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
  @Length(13, 13)
  spaceId!: string;

  @Field(() => Int)
  minTimeInSec!: number;

  @Field(() => Int)
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
  @Length(1, 20)
  collectionName!: string;

  @Field()
  @Length(1, 20)
  trait!: string;
}

@ObjectType('Winner')
class Winner {
  @Field(() => String, { nullable: true })
  username!: string;

  @Field(() => String, { nullable: true })
  avatarUrl!: string;
}

@ObjectType('GiveawayResult')
class GiveawayResult {
  @Field(() => Space, { nullable: true })
  space!: () => Space;

  @Field(() => [Winner], { nullable: true })
  winners!: Winner[];
}

@ObjectType('Space')
class Space {
  @Field(() => String, { nullable: true })
  spaceName!: string;

  @Field(() => Date, { nullable: true })
  startedAt!: Date;

  @Field(() => Date, { nullable: true })
  endedAt!: Date;

  @Field(() => String, { nullable: true })
  prizeName!: string;

  @Field(() => String, { nullable: true })
  hostUsername!: string;

  @Field(() => String, { nullable: true })
  hostAvatarUrl!: string;
}

export { GiveawayInput, GiveawayResult, Role, HoldingRequirementInput };
