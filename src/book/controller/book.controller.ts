import { Controller, Get, Query } from '@nestjs/common';
import { Book } from '../entity/book.entity';
import { BookService } from '../service/book.service';
import { GetBooksByAuthorRequestDto } from '../dto/get-books-by-author.request.dto';
import { GetBookByNameRequestDto } from '../dto/get-book-by-name.request.dto';

@Controller('v1/book')
export class BookController {
  constructor(private readonly bookService: BookService) {}
  @Get('/author')
  async getBooksByAuthor(
    @Query() dto: GetBooksByAuthorRequestDto,
  ): Promise<Book[]> {
    return await this.bookService.getBooksByAuthor(dto);
  }

  @Get('/name')
  async getBooksByName(@Query() dto: GetBookByNameRequestDto): Promise<Book> {
    return await this.bookService.getBookByName(dto);
  }
}
