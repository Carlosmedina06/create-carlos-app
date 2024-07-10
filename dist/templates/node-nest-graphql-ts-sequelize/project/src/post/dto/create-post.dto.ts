import { IsString, IsInt, Min, IsNotEmpty } from 'class-validator'
import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class CreatePostDto {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  title: string

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  content: string

  @Field(() => Int)
  @IsInt()
  @Min(1)
  userId: number
}
