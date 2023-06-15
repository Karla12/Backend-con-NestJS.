import { Injectable, NotFoundException } from '@nestjs/common';
import { Order } from '../entities/order.entity';
import { CreateOrderDto } from 'src/dtos/orders.dtos';

@Injectable()
export class OrdersService {
  private counterId = 1;
  private orders: Order[] = [{
    id: 1,
    name: 'Order 1',
    quantity: 3,
    total: 100
  }];

  findAll() {
    return this.orders;
  }

  findOne(id: number) {
    const order = this.orders.find((item) => item.id === id);
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }

  create(payload: CreateOrderDto) {
    this.counterId = this.counterId + 1;
    const newOrder = {
      id: this.counterId,
      ...payload
    };
    this.orders.push(newOrder);
    return newOrder;
  }

  update(id: number, payload: any) {
    const order = this.findOne(id);
    if (!order) {
      return null;
    }
    const indexOrder = this.orders.findIndex((item) => item.id === id);
    this.orders[indexOrder] = { ...order, ...payload };
    return this.orders[indexOrder];
  }

  remove(id: number) {
    const index = this.orders.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Order #${id} not found`);
    }
    this.orders.splice(index, 1);
    return true;
  }
}
