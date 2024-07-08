import { Injectable, BadRequestException } from '@nestjs/common'
import { validate } from 'class-validator'
import { User } from 'src/user/entities/user.entity'
import { InjectModel } from '@nestjs/sequelize'
import { Repository } from 'sequelize-typescript'

import { Post } from './entities/post.entity'
import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'

@Injectable()
export class PostService {
  constructor(@InjectModel(Post) private postRepository: Repository<Post>) {}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    // Validar el DTO
    const dto = new CreatePostDto()

    dto.title = createPostDto.title
    dto.content = createPostDto.content
    dto.userId = createPostDto.userId

    const errors = await validate(dto)

    if (errors.length > 0) {
      throw new BadRequestException(errors)
    }

    // Crear el post
    return this.postRepository.create({
      title: dto.title,
      content: dto.content,
      userId: dto.userId,
    })
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

    if (errors.length > 0) {
      throw new BadRequestException(errors)
    }

    // Actualizar el post
    const post = await this.postRepository.findByPk(id)

    post.title = dto.title
    post.content = dto.content

    return post.save()
  }

  async remove(id: number): Promise<void> {
    const post = await this.postRepository.findByPk(id)

    if (!post) {
      throw new BadRequestException('Post not found')
    }

    await post.destroy()
  }
}
