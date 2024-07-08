import { PartialType } from '@nestjs/mapped-types'
import { Field, InputType } from '@nestjs/graphql'

import { CreatePostDto } from './create-post.dto'

@InputType()
export class UpdatePostDto extends PartialType(CreatePostDto) {
  @Field(() => String)
  title: string

  @Field(() => String)
  content: string
}
