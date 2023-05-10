import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class OrderDto {
    @ApiProperty()
    @IsNotEmpty()
    orderName: string
}


export class UpdateOrderDto {
    @ApiProperty()
    @IsNotEmpty()
    orderName: string
}
