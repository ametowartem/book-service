import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../../user/entity/user.entity';
import { Book } from '../../book/entity/book.entity';
import { OrderBook } from './order-book.entity';

@Table({ tableName: 'orders', timestamps: false })
export class Order extends Model<Order> {
  @Column({ primaryKey: true, defaultValue: DataType.UUIDV4 })
  uuid?: string;

  @ForeignKey(() => User)
  @Column({ field: 'user_uuid' })
  userUuid: string;

  @Column({ type: DataType.DECIMAL })
  price: number;

  @BelongsTo(() => User)
  user?: User;

  @BelongsToMany(() => Book, () => OrderBook)
  books?: Book[];
}
