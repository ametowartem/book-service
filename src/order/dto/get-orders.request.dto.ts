import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class GetOrdersRequestDto {
  @ApiPropertyOptional({
    example: 'Kapitanskaya dochka',
  })
  @IsString()
  @IsOptional()
  bookName?: string;

  @ApiPropertyOptional({
    example: 'Fedor Mikhailovich Dostoevsky',
  })
  @IsString()
  @IsOptional()
  author?: string;
}
