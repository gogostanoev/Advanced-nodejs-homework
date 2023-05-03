import { IsNotEmpty } from "class-validator";

export class OrderDto {
    @IsNotEmpty()
    orderName: string
}


export class UpdateOrderDto {
    @IsNotEmpty()
    orderName: string
}
