import { Injectable, NotFoundException } from '@nestjs/common';
import { productsObj } from 'src/fakeDb/products';
import { Product } from 'src/interfaces/order.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsEntity } from './entities/product.entity';
import { Repository } from 'typeorm';
import { ProductDto } from './dto/products.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(ProductsEntity)
        private readonly productsRepository: Repository<ProductsEntity>
    ) {}

    // private products: Product[] = productsObj

    getProducts() {
        return this.productsRepository.find()
    }

    async getProductId(ID: string) {
        const productId = await this.productsRepository.findOneBy({ id: ID })

        if(!productId) {
            throw new NotFoundException(`Product with id ${ID} not found.`)
        }

        return productId
    }

    async createProduct(productDto: ProductDto) {
        const product: Product = {
            id: uuid(),
            ...productDto 
        }

        const productCreated = this.productsRepository.create(product)

        const productSaved = await this.productsRepository.save(productCreated)
        console.log(productSaved)

        return product.id
    }
}
