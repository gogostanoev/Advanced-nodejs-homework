import { Type } from "class-transformer";
import { ArrayNotEmpty, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";

export class OrderDto {
    @ValidateNested({ each: true })
    @Type(() => ProductDto)
    @ArrayNotEmpty()
    productsOrdered: ProductDto[]
}


export class ProductDto {
    @IsNotEmpty()
    @IsString()
    id: string;

    @IsNotEmpty()
    @IsString()
    productName: string;

    @IsNotEmpty()
    @IsNumber()
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