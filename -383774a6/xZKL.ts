import { Length } from 'class-validator';
import { Field, InputType, ObjectType } from 'type-graphql';

@ObjectType('Video')
@InputType()
export class Video {
  @Field()
  @Length(11, 11)
  id!: string;
}

@ObjectType('')
export class MatchedVideo {
  @Field()
  videoId!: string;

  @Field()
  timeInSec!: number;
}
