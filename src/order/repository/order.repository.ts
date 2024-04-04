import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from '../entity/order.entity';
import { ICreateOrder } from '../interface/create-order.interface';
import { Book } from '../../book/entity/book.entity';
import { BookRepository } from '../../book/repository/book.repository';
import { IGetOrders } from '../interface/get-orders.interface';
import { IGetOrderByUuid } from '../interface/get-order-by-uuid.interface';

@Injectable()
export class OrderRepository {
  private readonly logger = new Logger(OrderRepository.name);

  constructor(
    @InjectModel(Order) private readonly orderModel: typeof Order,
    private readonly bookRepository: BookRepository,
  ) {}

  async create(dto: ICreateOrder) {
    try {
      const newOrder = await this.orderModel.create({
        userUuid: dto.userUuid,
        price: 0,
      });

      const books: Book[] = await this.bookRepository.getBooksByUuids(
        dto.bookUuids,
      );

      let totalPrice = 0;
      for (const book of books) totalPrice += book.price;

      await newOrder.update({ price: totalPrice });

      await newOrder.$add('books', books);

      return newOrder;
    } catch (e) {
      this.logger.log(e);
      throw new InternalServerErrorException('Ошибка при создании заказа');
    }
  }

  async GetOrdersByBookNameOrAuthor(dto: IGetOrders) {
    const books: Array<Book> = [];
    if (dto.bookName) {
      books.push(
        await this.bookRepository.getBookByName({ name: dto.bookName }),
      );
    }

    if (dto.author) {
      books.push(
        ...(await this.bookRepository.getBooksByAuthor({ author: dto.author })),
      );
    }

    return await this.orderModel.findAll({
      include: [
        {
          model: Book,
          where: {
            uuid: books.map((el) => {
              return el.uuid;
            }),
          },
        },
      ],
    });
  }

  async GetOrderByUuid(dto: IGetOrderByUuid): Promise<Order> {
    return await this.orderModel.findOne({
      where: {
        uuid: dto.uuid,
      },
    });
  }
}
