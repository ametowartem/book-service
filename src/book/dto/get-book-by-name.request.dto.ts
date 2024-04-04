import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetBookByNameRequestDto {
  @ApiProperty({
    example: `Prestupleniye i Nakazaniye`,
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}
