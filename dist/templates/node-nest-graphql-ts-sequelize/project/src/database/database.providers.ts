import { SequelizeModule } from '@nestjs/sequelize'
import { Post } from 'src/post/entities/post.entity'
import { User } from 'src/user/entities/user.entity'

export const DatabaseProviders = [
  SequelizeModule.forRoot({
    dialect: 'sqlite',
    storage: ':memory:',
    autoLoadModels: true,
    synchronize: true,
    logging: false,
  }),
  SequelizeModule.forFeature([User, Post]),
]
