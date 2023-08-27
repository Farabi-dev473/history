import { ArrayMinSize, Length } from 'class-validator';
import { Field, InputType, ObjectType } from 'type-graphql';

@ObjectType('Video')
@InputType()
export class Video {
  @Field()
  @Length(11, 11)
  @ArrayMinSize(1, {
    message: 'For processing, you need to upload atleast 1 video',
  })
  id!: string;
}
