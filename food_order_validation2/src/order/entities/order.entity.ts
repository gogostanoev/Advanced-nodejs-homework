import { Order } from "src/interfaces/order.interface";
import { ProductsEntity } from "src/products/entities/product.entity";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";

@Entity('orders')
export class OrdersEntity implements Order {
    @PrimaryColumn()
    id: string;

    @Column()
    orderDate: Date;

    @Column()
    orderName: string;

    @OneToMany(() => ProductsEntity, (product) => product.order)
    productsOrdered: ProductsEntity[]
}