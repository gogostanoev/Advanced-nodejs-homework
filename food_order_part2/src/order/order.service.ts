import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ordersObj } from 'src/fakeDb/orders';
import { Order } from 'src/interfaces/order.interface';
import { OrderDto, UpdateOrderDto } from './dto/order.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class OrderService {
  private orders: Order[] = ordersObj;

  getOrders(): Order[] {
    return this.orders;
  }

  getOrderId(ID: string) {
    const orderId = this.orders.find((order) => order.id === ID);

    if (!orderId) {
      throw new NotFoundException(`Order with id ${ID} not found.`);
    }

    return orderId;
  }

  createOrder(orderDto: OrderDto) {
    const order: Order = {
      id: uuid(),
      orderDate: new Date(),
      ...orderDto,
    };

    this.orders.push(order);

    return `The order has been created successfully ${order.id}`;
  }

  updateOrder(orderDto: UpdateOrderDto, ID: string) {
    let orderFound = false;

    const editedOrders = this.orders.map((order) => {
      if (order.id === ID) {
        orderFound = true;

        return {
          ...order,
          productsOrdered: orderDto.productsOrdered || order.productsOrdered,
        };
      }

      return order;
    });

    if (!orderFound) {
      throw new BadRequestException(`Order with id ${ID} not found`);
    }

    this.orders = editedOrders;
    return `The order has been updated successfully ${ID}`;
  }

  deleteOrder(ID: string) {
    const deletedOrders = this.orders;

    for (let i = 0; i < deletedOrders.length; i++) {
      if (deletedOrders[i].id === ID) {
        deletedOrders.splice(i, 1);
        return `The order has been successfully deleted ${ID}`;
      }
    }

    throw new BadRequestException(`Order with id ${ID} not found`);
  }
}
