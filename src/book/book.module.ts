import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Book } from './entity/book.entity';
import { BookRepository } from './repository/book.repository';
import { BookController } from './controller/book.controller';
import { BookService } from './service/book.service';

@Module({
  imports: [SequelizeModule.forFeature([Book])],
  providers: [BookRepository, BookService],
  controllers: [BookController],
  exports: [BookRepository],
})
export class BookModule {}
