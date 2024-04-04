import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from './entity/order.entity';
import { OrderBook } from './entity/order-book.entity';
import { OrderRepository } from './repository/order.repository';
import { OrderService } from './service/order.service';
import { OrderController } from './controller/order.controller';
import { BookModule } from '../book/book.module';
import { AuthorModule } from '../author/author.module';

@Module({
  imports: [
    BookModule,
    AuthorModule,
    SequelizeModule.forFeature([Order, OrderBook]),
  ],
  providers: [OrderRepository, OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
