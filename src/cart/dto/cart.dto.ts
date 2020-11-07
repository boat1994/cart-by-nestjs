import { IsNotEmpty, IsNumber } from 'class-validator';

export class CartDto {
  @IsNotEmpty()
  product_code: string;

  @IsNotEmpty()
  @IsNumber()
  qty: number;
}
