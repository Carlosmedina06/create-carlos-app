import { Module } from '@nestjs/common'

import { GraphQLProviders } from './graphql.resovlers'

@Module({
  imports: [...GraphQLProviders],
  exports: [...GraphQLProviders],
})
export class GraphQLModule {}
