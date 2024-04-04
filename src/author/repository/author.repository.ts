import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Author } from '../entity/author.entity';

@Injectable()
export class AuthorRepository {
  constructor(
    @InjectModel(Author) private readonly authorModel: typeof Author,
  ) {}
}
