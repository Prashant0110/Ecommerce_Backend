import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AllowNull,
} from "sequelize-typescript";

@Table({
  tableName: "payments",
  modelName: "Payment",
  timestamps: true,
})
class Payment extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column({
    type: DataType.ENUM("COD", "khalti", "Esewa"),
    defaultValue: "COD",
  })
  declare paymentMethod: string;

  @Column({
    type: DataType.ENUM("paid", "unpaid"),
    defaultValue: "unpaid",
  })
  declare paymentStatus: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare pidx: string;
}

export default Payment;