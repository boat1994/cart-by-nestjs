import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateProductDto {
 
    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    code: string

    @IsNotEmpty()
    price: number

    @IsNotEmpty()
    @IsNumber()
    qty: number
}