import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { IdRouteParams } from 'src/interfaces/route.params';
import { ProductDto, UpdateProductDto } from './dto/products.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/interfaces/role.enum';
import { RolesGuard } from 'src/common/role-guard/roles.guards';
import { JwtAuthGuard } from 'src/common/jwt-auth/jwt-auth.guard';

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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async createProduct(@Body() body: ProductDto, @Param('productId') productId: string) {
 
    return await this.productService.createProduct(body, productId)
  }


  @Put(':id?')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async updateProduct(@Body() body: UpdateProductDto, @Param() params: IdRouteParams) {
    const id = params.id;

    return await this.productService.updateProduct(body, id);
  };


  @Delete(':id?')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async deleteProduct(@Param() params: IdRouteParams) {
    const id = params.id;

    return await this.productService.deleteProduct(id);
  }
}
