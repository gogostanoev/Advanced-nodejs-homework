import { Injectable } from '@nestjs/common';
import { ordersObj } from 'src/fakeDb/orders';
import { Order } from 'src/interfaces/order.interface';

@Injectable()
export class OrderService {

    getOrders(): Order[] {
        return ordersObj
    }
}
