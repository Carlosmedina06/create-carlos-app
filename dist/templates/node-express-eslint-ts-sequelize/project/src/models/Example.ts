import {
  BelongsToManyAddAssociationMixin,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize'

import sequelize from '../db'



class Example extends Model<InferAttributes<Example>, InferCreationAttributes<Example>> {
  declare name: string

}

Example.init(
  {
    name: {
      type: new DataTypes.STRING(),
    },

  },
  {
    tableName: 'Example',
    schema: 'SchemaName',
    sequelize,
  },
)

export default Example
