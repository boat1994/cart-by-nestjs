import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateCartDto  {
    @IsNotEmpty()
    product_id: string

    @IsNotEmpty()
    @IsNumber()
    qty: number

}