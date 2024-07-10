import { Query, Resolver, Args, Mutation } from '@nestjs/graphql'

import { PostService } from './post.service'
import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'
import { Post } from './entities/post.entity'

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Query(() => [Post])
  async posts(@Args('simple', { type: () => Boolean }) simple: boolean) {
    return this.postService.findAll(simple)
  }

  @Query(() => Post)
  async post(@Args('id', { type: () => Number }) id: number) {
    return this.postService.findOne(id)
  }

  @Mutation(() => Post)
  async createPost(@Args('createPostDto') createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto)
  }

  @Mutation(() => Post)
  async updatePost(
    @Args('id', { type: () => Number }) id: number,
    @Args('updatePostDto') updatePostDto: UpdatePostDto,
  ) {
    return this.postService.update(id, updatePostDto)
  }

  @Mutation(() => Post)
  async removePost(@Args('id', { type: () => Number }) id: number) {
    return this.postService.remove(id)
  }
}
