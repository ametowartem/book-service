import { Injectable } from '@nestjs/common';
import { OrderRepository } from '../repository/order.repository';
import { ICreateOrder } from '../interface/create-order.interface';
import { IGetOrders } from '../interface/get-orders.interface';
import { Order } from '../entity/order.entity';
import { IGetOrderByUuid } from '../interface/get-order-by-uuid.interface';

@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {}

  async create(dto: ICreateOrder): Promise<Order> {
    return await this.orderRepository.create(dto);
  }

  async getOrdersByBookNameOrAuthor(dto: IGetOrders): Promise<Order[]> {
    return await this.orderRepository.getOrdersByBookNameOrAuthor(dto);
  }

  async getOrderByUuid(dto: IGetOrderByUuid): Promise<Order> {
    return await this.orderRepository.getOrderByUuid(dto);
  }
}
