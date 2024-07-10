import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common'
import { validate } from 'class-validator'
import { InjectModel } from '@nestjs/sequelize'
import { Repository } from 'sequelize-typescript'
import { User } from 'src/user/entities/user.entity'

import { Post } from './entities/post.entity'
import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post) private postRepository: Repository<Post>,
    @InjectModel(User) private userRepository: Repository<User>,
  ) {}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    try {
      const dto = new CreatePostDto()

      dto.title = createPostDto.title
      dto.content = createPostDto.content
      dto.userId = createPostDto.userId

      const errors = await validate(dto)

      if (errors.length > 0) throw new BadRequestException(errors)

      const user = await this.userRepository.findByPk(dto.userId)

      if (!user) throw new NotFoundException(`User with ID ${dto.userId} not found`)

      const newPost = await this.postRepository.create({
        title: dto.title,
        content: dto.content,
        userId: dto.userId,
      })

      if (!newPost) throw new BadRequestException('An error occurred while creating the post')

      return newPost
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error
      }
      console.error(error)
      throw new BadRequestException('An unexpected error occurred while creating the post')
    }
  }

  async findAll(simple: boolean = false): Promise<Post[]> {
    return this.postRepository.findAll({
      include: simple ? [] : [User],
    })
  }

  async findOne(id: number): Promise<Post> {
    return this.postRepository.findByPk(id, {
      include: [User],
    })
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
    // Validar el DTO
    const dto = new UpdatePostDto()

    dto.title = updatePostDto.title
    dto.content = updatePostDto.content

    const errors = await validate(dto)

    if (errors.length > 0) throw new BadRequestException(errors)

    // Actualizar el post
    const post = await this.postRepository.findByPk(id)

    if (!post) throw new NotFoundException('Post not found')

    const postUpdated = await post.update({
      title: dto.title,
      content: dto.content,
    })

    return postUpdated
  }

  async remove(id: number): Promise<void> {
    const post = await this.postRepository.findByPk(id)

    if (!post) {
      throw new NotFoundException('Post not found')
    }

    await post.destroy()
  }
}
