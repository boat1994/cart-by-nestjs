import { HttpException, HttpStatus, Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Product } from 'src/products/products.entity';
import { getConnection, Repository } from 'typeorm';
import { CartItem } from './cart-items.entity';
import { Cart } from './cart.entity';
import { CreateCartDto } from './dto';

@Injectable()
export class CartService {

    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        @InjectRepository(Cart)
        private readonly cartRepository: Repository<Cart>
    ) {}

    async getCartById(id: number) {
       return this.cartRepository.findOneOrFail(id, {relations: ["items"]})
    }

    async createCart(createCartDto: CreateCartDto) {
        await this.validateCart(createCartDto)
        const { product_code, qty } = createCartDto
        const product: Product = await this.productRepository.findOneOrFail({code: product_code})

        return await this.initialCart(product, qty)
    }

    private async validateCart(createCartDto: CreateCartDto) {
        const { product_code, qty } = createCartDto
        try {
           const product: Product = await this.productRepository.findOneOrFail({code: product_code})
           if (product.qty < qty) {
               throw new NotAcceptableException("insufficient stock")
           }
        } catch (error) {
            throw new HttpException({message: error.message}, HttpStatus.BAD_REQUEST)
        }
    }

    private async initialCart(product: Product, qty: number): Promise<Cart> {
        const connection = await getConnection()
        const cartItem = new CartItem()
        cartItem.product = product;
        cartItem.qty = qty;
        await connection.manager.save(cartItem)

        const cart: Cart = new Cart()
        cart.items = [cartItem]
        cart.price = this.getCartPrice(cart)
        return await connection.manager.save(cart)
    }

    private getCartPrice(cart: Cart) {
       return cart.items.reduce((total, item) => (item.product.price * item.qty) + total, 0)
    }

}
