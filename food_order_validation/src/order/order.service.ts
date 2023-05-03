import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Order } from 'src/interfaces/order.interface';
import { OrderDto, UpdateOrderDto } from './dto/order.dto';
import { v4 as uuid } from 'uuid';
import { OrdersEntity } from './entities/order.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrdersEntity)
    private readonly ordersRepository: Repository<OrdersEntity>
  ) {}

  async getOrders() {
    return await this.ordersRepository.find({
      relations: ['productsOrdered']
    });
  }

  async getOrderId(ID: string) {
    const orderId = await this.ordersRepository.findOne({
      where: { id: ID },
      relations: ['productsOrdered']
    });

    if (!orderId) {
      throw new NotFoundException(`Order with id ${ID} not found.`);
    }

    return orderId;
  }

  async createOrder(orderDto: OrderDto) {
    const order: Order = {
      id: uuid(),
      orderDate: new Date(),
      ...orderDto,
    };

    const orderCreated = this.ordersRepository.create(order);

    const orderSaved = await this.ordersRepository.save(orderCreated);
    console.log(orderSaved);

    return `The order has been created successfully ${order.id}`;
  }

  async updateOrder(orderDto: UpdateOrderDto, ID: string) {
    const updatedOrder: Order = {
      id: ID,
      orderDate: new Date(),
      ...orderDto,
    };

    const order = await this.ordersRepository.preload({
      id: ID,
      ...updatedOrder,
    });

    if (!order) {
      throw new BadRequestException(`Order with id ${ID} not found`);
    }

    await this.ordersRepository.save(order);
    return `The order has been updated successfully ${ID}`;
  }

  async deleteOrder(ID: string) {
    if (
      !(await this.ordersRepository.findOne({

        where: { id: ID },
        relations: ['productsOrdered'],

      }))
    )
      throw new BadRequestException(`Order with id ${ID} not found`);

    await this.ordersRepository.delete(ID);
    return `The order has been successfully deleted ${ID}`;
  }
}
