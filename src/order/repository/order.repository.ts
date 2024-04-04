import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from '../entity/order.entity';
import { ICreateOrder } from '../interface/create-order.interface';
import { Book } from '../../book/entity/book.entity';
import { BookRepository } from '../../book/repository/book.repository';
import { IGetOrders } from '../interface/get-orders.interface';
import { IGetOrderByUuid } from '../interface/get-order-by-uuid.interface';
import { Sequelize } from 'sequelize-typescript';
import { Author } from '../../author/entity/author.entity';
import { Op } from 'sequelize';

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

  async getOrdersByBookNameOrAuthor(dto: IGetOrders) {
    let whereClause = {};
    if (dto.bookName) {
      whereClause = { name: dto.bookName };
    }

    try {
      return await this.orderModel.findAll({
        include: [
          {
            model: Book,
            include: [
              {
                model: Author,
                where: Sequelize.where(
                  Sequelize.fn(
                    'concat',
                    Sequelize.col('first_name'),
                    ' ',
                    Sequelize.col('patronymic'),
                    ' ',
                    Sequelize.col('last_name'),
                  ),
                  { [Op.like]: `%${dto.author || ''}%` },
                ),
              },
            ],
            where: whereClause,
          },
        ],
      });
    } catch (e) {
      this.logger.log(e);
      throw new NotFoundException('Заказ с такими параметрами не найден');
    }
  }

  async getOrderByUuid(dto: IGetOrderByUuid): Promise<Order> {
    return await this.orderModel.findOne({
      where: {
        uuid: dto.uuid,
      },
    });
  }
}
