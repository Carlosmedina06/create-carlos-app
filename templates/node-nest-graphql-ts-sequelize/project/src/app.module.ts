import { Module } from '@nestjs/common'

import { DatabaseModule } from './database/database.module'
import { GraphQLModule } from './graphql/graphql.module'
import { UserModule } from './user/user.module'
import { PostModule } from './post/post.module'
import { AppService } from './app.service'

@Module({
  imports: [GraphQLModule, DatabaseModule, UserModule, PostModule],
  providers: [AppService],
})
export class AppModule {}
