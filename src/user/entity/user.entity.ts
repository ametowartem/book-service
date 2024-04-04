import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Order } from '../../order/entity/order.entity';

@Table({ tableName: 'users', timestamps: false })
export class User extends Model<User> {
  @Column({ primaryKey: true, defaultValue: DataType.UUIDV4 })
  uuid: string;

  @Column({ field: 'first_name' })
  firstName: string;

  @Column({ field: 'last_name' })
  lastName: string;

  @Column({ allowNull: true })
  patronymic?: string;

  @HasMany(() => Order)
  orders?: Order[];
}
