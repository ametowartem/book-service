import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Author } from '../../author/entity/author.entity';
import { OrderBook } from '../../order/entity/order-book.entity';
import { Order } from '../../order/entity/order.entity';

@Table({ tableName: 'books', timestamps: false })
export class Book extends Model<Book> {
  @Column({ primaryKey: true, defaultValue: DataType.UUIDV4 })
  uuid: string;

  @Column
  name: string;

  @Column({ type: DataType.DECIMAL })
  get price(): number {
    const value = this.getDataValue('price') as unknown as string;
    return value === null ? null : parseFloat(value);
  }

  set price(value: number) {
    this.setDataValue('price', value);
  }

  @ForeignKey(() => Author)
  @Column({ field: 'author_uuid' })
  authorUuid: string;

  @BelongsTo(() => Author, 'author_uuid')
  author?: Author;

  @BelongsToMany(() => Order, () => OrderBook)
  orders?: Order[];
  // orders?: Array<Order & { OrderBook: OrderBook }>;
}
