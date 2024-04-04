import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Author } from './entity/author.entity';
import { AuthorRepository } from './repository/author.repository';

@Module({
  imports: [SequelizeModule.forFeature([Author])],
  providers: [AuthorRepository],
  exports: [AuthorRepository],
})
export class AuthorModule {}
