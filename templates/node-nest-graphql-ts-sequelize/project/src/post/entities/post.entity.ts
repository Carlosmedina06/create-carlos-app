import { ObjectType, Field, Int } from '@nestjs/graphql'
import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript'
import { User } from 'src/user/entities/user.entity'

@Table
@ObjectType()
export class Post extends Model<Post> {
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
  title: string

  @Field()
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  content: string

  @Field(() => Int)
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number

  @BelongsTo(() => User)
  user: User
}
