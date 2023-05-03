import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsEntity } from './entities/product.entity';
import { Repository } from 'typeorm';
import { ProductDto, UpdateProductDto } from './dto/products.dto';
import { v4 as uuid } from 'uuid';
import { OrdersEntity } from 'src/order/entities/order.entity';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(ProductsEntity)
        private readonly productsRepository: Repository<ProductsEntity>,

        @InjectRepository(OrdersEntity)
        private readonly ordersRepository: Repository<OrdersEntity>
    ) {}


    async getProducts(): Promise<ProductsEntity[]> {
        return await this.productsRepository.find({ relations: ['order'] });
    };


    async getProductId(ID: string): Promise<ProductsEntity> {
        const productId = await this.productsRepository.findOneBy({ id: ID });

        if(!productId) {
            throw new NotFoundException(`Product with id ${ID} not found.`);
        };

        return productId;
    };


    async createProduct(productDto: ProductDto, ID: string): Promise<string> {
        const order = await this.ordersRepository.findOneBy({ id: ID });

        if (!order) {
            throw new BadRequestException(`Order with id ${ID} not found.`);
        };

        const product = this.productsRepository.create({
            id: uuid(),
            ...productDto,
            order: order 
        });

        const productSaved = await this.productsRepository.save(product);

        return `The product has been created succesfully ${productSaved.id}`;
    };

    
    async updateProduct(productDto: UpdateProductDto, ID: string) {
        const product = await this.productsRepository.preload({
            id: ID,
            ...productDto,
        });

        if (!product) {
            throw new BadRequestException(`Product with id ${ID} not found.`);
        };

        await this.productsRepository.save(product);
        return `The product has been updated successfully ${ID}`;
    };


    async deleteProduct(ID: string) {
        if (
            !(await this.productsRepository.findOne({

                where: { id: ID },
                relations: ['order'],

            }))
        )
        throw new BadRequestException(`Product with id ${ID} not found.`);

        await this.productsRepository.delete(ID);
        return `The product has been successfully deleted ${ID}`;
    };
};
