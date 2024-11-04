import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AllowNull,
} from "sequelize-typescript";

@Table({
  tableName: "categories",
  modelName: "Category",
  timestamps: true,
})
class Category extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
  })
  declare categoryName: string;
}

//   @Column({
//     type: DataType.TEXT,
//   })
//   declare description: string;

//   @Column({
//     type: DataType.DECIMAL(10, 2),
//   })
//   declare price: number;

//   @Column({
//     type: DataType.INTEGER,
//   })
//   declare quantity: number;

//   @Column({
//     type: DataType.STRING,
//   })
//   declare imagePath: string;
// }

export default Category;
