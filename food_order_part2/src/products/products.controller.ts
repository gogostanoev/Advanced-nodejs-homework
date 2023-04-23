import { Controller, Get, Param } from '@nestjs/common';
import { ProductsService } from './products.service';
import { IdRouteParams } from 'src/interfaces/route.params';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Get()
  getProducts() {
    const products = this.productService.getProducts();

    return products;
  }

  @Get(':id')
  getProductId(@Param() params: IdRouteParams) {
    const id = params.id;

    return this.productService.getProductId(id);
  }
}
