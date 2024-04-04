import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { User } from './user/entity/user.entity';
import { Author } from './author/entity/author.entity';
import { Book } from './book/entity/book.entity';
import { OrderModule } from './order/order.module';
import { BookModule } from './book/book.module';
import { UserModule } from './user/user.module';
import { AuthorModule } from './author/author.module';
import { Order } from './order/entity/order.entity';
import { OrderBook } from './order/entity/order-book.entity';

@Module({
  imports: [
    OrderModule,
    BookModule,
    UserModule,
    AuthorModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        HOST: Joi.string().default('localhost'),
        PORT: Joi.number().default(3000),
        DB_HOST: Joi.string().default('localhost'),
        DB_PORT: Joi.number().default(5432),
        DB_USERNAME: Joi.string().default('postgres'),
        DB_PASSWORD: Joi.string().default('postgres'),
        DB_NAME: Joi.string().default('book_service_db'),
      }),
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        models: [User, Author, Book, Order, OrderBook],
        logging: false,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
