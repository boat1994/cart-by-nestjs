import { HttpException, HttpStatus, Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ProductsEntity } from 'src/products/products.entity';
import { Repository } from 'typeorm';
import { CreateCartDto } from './dto';

@Injectable()
export class CartService {

    constructor(
        @InjectRepository(ProductsEntity)
        private readonly productRepository: Repository<ProductsEntity>
    ) {}

    async getCartById(id: string) {
        console.log(id)
    }

    async createCart(createCartDto: CreateCartDto) {
   
       await this.validateCart(createCartDto)
        
       return {
           totalPrice: 20
       }
    }

    private async validateCart(createCartDto: CreateCartDto) {
        const { product_id, qty } = createCartDto
     
        try {
           const product: ProductsEntity = await this.productRepository.findOneOrFail(product_id)

           if (product.qty < qty) {
               throw new NotAcceptableException("insufficient stock")
           }
         
        } catch (error) {
            throw new HttpException({message: error.message}, HttpStatus.BAD_REQUEST)
        }
 
    }

}
