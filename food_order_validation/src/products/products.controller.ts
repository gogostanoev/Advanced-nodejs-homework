import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProductsService } from './products.service';
import { IdRouteParams } from 'src/interfaces/route.params';
import { ProductDto, UpdateProductDto } from './dto/products.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Get()
  async getProducts() {
    const products = await this.productService.getProducts();

    return products;
  }

  @Get(':id?')
  async getProductId(@Param() params: IdRouteParams) {
    const id = params.id;

    return await this.productService.getProductId(id);
  }

  @Post(':productId?')
  async createProduct(@Body() body: ProductDto, @Param('productId') productId: string) {
 
    return await this.productService.createProduct(body, productId)
  }


  @Put(':id?')
  async updateProduct(@Body() body: UpdateProductDto, @Param() params: IdRouteParams) {
    const id = params.id;

    return await this.productService.updateProduct(body, id);
  };


  @Delete(':id?')
  async deleteProduct(@Param() params: IdRouteParams) {
    const id = params.id;

    return await this.productService.deleteProduct(id);
  }
}
