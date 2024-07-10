import { Query, Resolver, Args, Mutation } from '@nestjs/graphql'

import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  async users() {
    return this.userService.findAll()
  }

  @Query(() => User)
  async user(@Args('id', { type: () => Number }) id: number) {
    return this.userService.findOne(id)
  }

  @Mutation(() => User)
  async createUser(@Args('createUserDto') createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto)
  }

  @Mutation(() => User)
  async updateUser(
    @Args('id', { type: () => Number }) id: number,
    @Args('updateUserDto') updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto)
  }

  @Mutation(() => User)
  async removeUser(@Args('id', { type: () => Number }) id: number) {
    return this.userService.remove(id)
  }
}
