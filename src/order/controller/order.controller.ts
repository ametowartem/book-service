import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { OrderService } from '../service/order.service';
import { CreateOrderRequestDto } from '../dto/create-order.request.dto';
import { GetOrdersRequestDto } from '../dto/get-orders.request.dto';
import { Order } from '../entity/order.entity';
import { GetOrderByUuidRequestDto } from '../dto/get-order-by-uuid.request.dto';

@Controller('v1/order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('')
  async createOrder(@Body() dto: CreateOrderRequestDto): Promise<Order> {
    return await this.orderService.create(dto);
  }

  @Get('')
  async getOrdersByBookNameOrAuthor(
    @Query() dto: GetOrdersRequestDto,
  ): Promise<Order[]> {
    return await this.orderService.getOrdersByBookNameOrAuthor(dto);
  }

  @Get(':uuid')
  async getOrderByUuid(@Param() dto: GetOrderByUuidRequestDto): Promise<Order> {
    return await this.orderService.getOrderByUuid(dto);
  }
}
