import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { IdRouteParams } from 'src/interfaces/route.params';
import { ProductDto } from './dto/products.dto';

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

  @Post()
  async createProduct(@Body() body: ProductDto) {
 
    return await this.productService.createProduct(body)
  }
}
