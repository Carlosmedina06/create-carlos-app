import { Injectable, BadRequestException } from '@nestjs/common'
import { validate } from 'class-validator'
import { Post } from 'src/post/entities/post.entity'
import { InjectModel } from '@nestjs/sequelize'
import { Repository } from 'sequelize-typescript'

import { User } from './entities/user.entity'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userRepository: Repository<User>) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll({
      include: [Post],
    })
  }

  async findOne(id: number): Promise<User> {
    return this.userRepository.findByPk(id, {
      include: [Post],
    })
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    // Validar el DTO
    const dto = new CreateUserDto()

    dto.username = createUserDto.username
    dto.email = createUserDto.email

    const errors = await validate(dto)

    if (errors.length > 0) {
      throw new BadRequestException(errors)
    }

    // Crear el usuario
    return this.userRepository.create({
      username: dto.username,
      email: dto.email,
    })
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    // Validar el DTO
    const dto = new UpdateUserDto()

    dto.username = updateUserDto.username
    dto.email = updateUserDto.email

    const errors = await validate(dto)

    if (errors.length > 0) {
      throw new BadRequestException(errors)
    }

    // Actualizar el usuario
    const user = await this.userRepository.findByPk(id)

    if (!user) {
      throw new BadRequestException('User not found')
    }

    user.username = dto.username
    user.email = dto.email

    return user.save()
  }

  async remove(id: number): Promise<void> {
    const user = await this.userRepository.findByPk(id)

    if (!user) {
      throw new BadRequestException('User not found')
    }

    await user.destroy()
  }
}
