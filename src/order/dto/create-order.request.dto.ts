import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateOrderRequestDto {
  @ApiProperty({
    example: '7f705d11-f4a1-4337-8a3a-b5f59d45d048',
  })
  @IsNotEmpty()
  @IsUUID()
  userUuid: string;

  @ApiProperty({
    example: [
      '4b27363a-5ccf-4f12-998d-c1fc0bafa19c',
      '4491fedc-e938-4b71-a8d4-a10221f9c3cf',
    ],
  })
  @IsArray()
  @ArrayMinSize(1, { message: 'Массив должен содержать хотя бы 1 элемент' })
  @IsUUID(undefined, {
    each: true,
    message: 'Каждый элемент массива должен быть uuid',
  })
  bookUuids: string[];
}
