import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Order } from './order.entity';
import { Book } from '../../book/entity/book.entity';

@Table({ tableName: 'orders_books', timestamps: false })
export class OrderBook extends Model<OrderBook> {
  @Column({ primaryKey: true, defaultValue: DataType.UUIDV4 })
  uuid: string;

  @ForeignKey(() => Order)
  @Column({ field: 'order_uuid' })
  orderUuid: string;

  @ForeignKey(() => Book)
  @Column({ field: 'book_uuid' })
  bookUuid: string;
}
