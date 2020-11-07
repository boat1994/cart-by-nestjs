import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateCartDto  {
    @IsNotEmpty()
    product_code: string

    @IsNotEmpty()
    @IsNumber()
    qty: number

}