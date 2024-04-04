import { Injectable } from '@nestjs/common';
import { BookRepository } from '../repository/book.repository';
import { Book } from '../entity/book.entity';
import { IGetBookByName } from '../interface/get-book-by-name.interface';
import { IGetBooksByAuthor } from '../interface/get-books-by-author.interface';

@Injectable()
export class BookService {
  constructor(private readonly bookRepository: BookRepository) {}

  async getBookByName(dto: IGetBookByName): Promise<Book> {
    return await this.bookRepository.getBookByName(dto);
  }

  async getBooksByAuthor(dto: IGetBooksByAuthor): Promise<Book[]> {
    return await this.bookRepository.getBooksByAuthor({ author: dto.author });
  }
}
