import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto';

@Injectable()
export class CartService {

    async getCartById(id: string) {
        console.log(id)
    }

    async createCart(createCartData: CreateCartDto) {
       const { qty, product_id } = createCartData
        
       return {
           totalPrice: 20
       }
    }

}
