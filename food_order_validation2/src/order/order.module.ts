import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersEntity } from './entities/order.entity';
import { ProductsEntity } from 'src/products/entities/product.entity';
import { ProductsService } from 'src/products/products.service';
import { ProductsController } from 'src/products/products.controller';

@Module({
  imports: [TypeOrmModule.forFeature([OrdersEntity, ProductsEntity])],
  providers: [OrderService, ProductsService],
  controllers: [OrderController, ProductsController]
})
export class OrderModule {}
