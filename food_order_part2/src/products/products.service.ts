import { Injectable, NotFoundException } from '@nestjs/common';
import { productsObj } from 'src/fakeDb/products';
import { Product } from 'src/interfaces/order.interface';

@Injectable()
export class ProductsService {
    private products: Product[] = productsObj

    getProducts(): Product[] {
        return this.products
    }

    getProductId(ID: string) {
        const productId = this.products.find((product) => product.id === ID)

        if(!productId) {
            throw new NotFoundException(`Product with id ${ID} not found.`)
        }

        return productId
    }
}
