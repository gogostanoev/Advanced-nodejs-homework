import { IsNotEmpty, ValidateNested } from "class-validator";

export class OrderDto {
    @ValidateNested({ each: true })
    @IsNotEmpty()
    productsOrdered: ProductDto[]
}


export class ProductDto {
    @IsNotEmpty()
    id: string;

    @IsNotEmpty()
    productName: string;

    @IsNotEmpty()
    productPrice: number;
}



export class UpdateOrderDto {
    productsOrdered: UpdateProductDto[]
}


export class UpdateProductDto {
    id: string;

    productName: string;

    productPrice: number;
}