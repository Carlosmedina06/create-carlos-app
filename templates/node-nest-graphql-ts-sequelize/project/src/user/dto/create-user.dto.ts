import { IsString, IsEmail } from 'class-validator'
import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateUserDto {
  @Field(() => String)
  @IsString()
  username: string

  @Field(() => String)
  @IsEmail({}, { message: 'Email must be a valid email address' })
  email: string
}
