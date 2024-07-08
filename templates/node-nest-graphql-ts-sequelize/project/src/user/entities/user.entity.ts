import { ObjectType, Field, Int } from '@nestjs/graphql'
import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript'
import { Post } from 'src/post/entities/post.entity'

@Table
@ObjectType()
export class User extends Model<User> {
  @Field(() => Int)
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number

  @Field()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  username: string

  @Field()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email: string

  @HasMany(() => Post)
  posts: Post[]
}
