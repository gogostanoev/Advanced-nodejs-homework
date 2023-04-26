import { Type } from "class-transformer";
import { ArrayNotEmpty, ValidateNested } from "class-validator";
import { ProductDto, UpdateProductDto } from "src/products/dto/products.dto";

export class OrderDto {
    @ValidateNested({ each: true })
    @Type(() => ProductDto)
    @ArrayNotEmpty()
    productsOrdered: ProductDto[]
}


export class UpdateOrderDto {
    productsOrdered: UpdateProductDto[]
}
