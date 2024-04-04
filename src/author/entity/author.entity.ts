import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Book } from '../../book/entity/book.entity';

@Table({ tableName: 'authors', timestamps: false })
export class Author extends Model<Author> {
  @Column({ primaryKey: true, defaultValue: DataType.UUIDV4 })
  uuid: string;

  @Column({ field: 'first_name' })
  firstName: string;

  @Column({ field: 'last_name' })
  lastName: string;

  @Column({ allowNull: true })
  patronymic?: string;

  @HasMany(() => Book)
  books?: Book[];
}
