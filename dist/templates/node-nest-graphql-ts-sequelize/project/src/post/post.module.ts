import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { User } from 'src/user/entities/user.entity'

import { PostService } from './post.service'
import { PostResolver } from './post.resolver'
import { Post } from './entities/post.entity'

@Module({
  imports: [SequelizeModule.forFeature([Post, User])],
  providers: [PostService, PostResolver],
  exports: [PostService],
})
export class PostModule {}
