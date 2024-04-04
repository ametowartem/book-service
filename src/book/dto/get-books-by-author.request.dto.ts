import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetBooksByAuthorRequestDto {
  @ApiProperty({
    example: 'Fedor Mikhailovich Dostoevsky',
  })
  @IsString()
  @IsNotEmpty()
  author: string;
}
