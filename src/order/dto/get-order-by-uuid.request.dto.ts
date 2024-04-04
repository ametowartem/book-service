import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class GetOrderByUuidRequestDto {
  @ApiProperty({
    example: 'a77e3374-97db-47a0-b948-a359b957720c',
  })
  @IsUUID()
  @IsNotEmpty()
  uuid: string;
}
