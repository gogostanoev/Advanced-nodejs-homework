import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { IdRouteParams } from 'src/interfaces/route.params';
import { OrderDto } from './dto/order.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  getOrders() {
    const orders = this.orderService.getOrders();

    return orders;
  }

  @Get(':id')
  getOrderId(@Param() params: IdRouteParams) {
    const id = params.id;

    return this.orderService.getOrderId(id);
  }

  @Post()
  createOrder(@Body() body: OrderDto) {
    console.log(body);

    return this.orderService.createOrder(body);
  }

  @Put(':id')
  updateOrder(@Body() body: OrderDto, @Param() params: IdRouteParams) {
    const id = params.id;

    return this.orderService.updateOrder(body, id);
  }

  @Delete(':id')
  deleteOrder(@Param() params: IdRouteParams) {
    const id = params.id;

    return this.orderService.deleteOrder(id);
  }
}
