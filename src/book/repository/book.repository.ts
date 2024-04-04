import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Book } from '../entity/book.entity';
import { Sequelize } from 'sequelize-typescript';
import { Op } from 'sequelize';
import { Author } from '../../author/entity/author.entity';
import { IGetBookByName } from '../interface/get-book-by-name.interface';
import { IGetBooksByAuthor } from '../interface/get-books-by-author.interface';

@Injectable()
export class BookRepository {
  constructor(@InjectModel(Book) private readonly bookModel: typeof Book) {}

  async getBooksByUuids(uuids: string[]): Promise<Book[]> {
    return await this.bookModel.findAll<Book>({
      where: { uuid: uuids },
    });
  }

  async getBookByName(dto: IGetBookByName): Promise<Book> {
    return await this.bookModel.findOne<Book>({
      where: { name: dto.name },
    });
  }

  async getBooksByAuthor(dto: IGetBooksByAuthor): Promise<Book[]> {
    return await this.bookModel.findAll<Book>({
      include: [
        {
          model: Author,
          where: Sequelize.where(
            Sequelize.fn(
              'CONCAT',
              Sequelize.col('first_name'),
              ' ',
              Sequelize.col('patronymic'),
              ' ',
              Sequelize.col('last_name'),
            ),
            { [Op.like]: `%${dto.author}%` },
          ),
        },
      ],
    });
  }
}
