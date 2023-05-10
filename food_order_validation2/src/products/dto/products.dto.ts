import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ProductDto {
    // @IsNotEmpty()
    // @IsString()
    @ApiProperty()
    id: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    productName: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    productPrice: number;
}


export class UpdateProductDto {
    id: string;

    productName: string;

    productPrice: number;
}