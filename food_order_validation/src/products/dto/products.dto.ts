import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ProductDto {
    // @IsNotEmpty()
    // @IsString()
    id: string;

    @IsNotEmpty()
    @IsString()
    productName: string;

    @IsNotEmpty()
    @IsNumber()
    productPrice: number;
}


export class UpdateProductDto {
    id: string;

    productName: string;

    productPrice: number;
}