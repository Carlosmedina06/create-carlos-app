import { PartialType } from '@nestjs/mapped-types'
import { IsString, IsEmail } from 'class-validator'
import { Field, InputType } from '@nestjs/graphql'

import { CreateUserDto } from './create-user.dto'

@InputType()
export class UpdateUserDto extends PartialType(CreateUserDto) {
  @Field(() => String)
  @IsString()
  username: string

  @Field(() => String)
  @IsEmail({}, { message: 'Email must be a valid email address' })
  email: string
}
