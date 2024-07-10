import { Module } from '@nestjs/common'

import { GraphQLProviders } from './graphql.resolvers'

@Module({
  imports: [...GraphQLProviders],
  exports: [...GraphQLProviders],
})
export class GraphQLModule {}
