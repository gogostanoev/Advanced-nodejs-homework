import { Product } from "src/interfaces/order.interface";
import { OrdersEntity } from "src/order/entities/order.entity";
import { Entity, Column, PrimaryColumn, OneToOne, ManyToOne } from "typeorm";

@Entity('products')
export class ProductsEntity implements Product {
    @PrimaryColumn()
    id: string;

    @Column()
    productName: string;

    @Column()
    productPrice: number

    @ManyToOne(() => OrdersEntity, (order) => order.productsOrdered, { onDelete: 'CASCADE' })
    order: OrdersEntity
}