import {
  HttpException,
  HttpStatus,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Product } from 'src/products/products.entity';
import { getConnection, Repository } from 'typeorm';
import { CartItem } from './cart-items.entity';
import { Cart } from './cart.entity';
import { CartDto } from './dto/cart.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
  ) {}

  async getCartById(id: number): Promise<Cart> {
    try {
      return await this.cartRepository.findOneOrFail(id, {
        relations: ['items', 'items.product'],
      });
    } catch (error) {
      throw new HttpException({ message: error.message }, HttpStatus.NOT_FOUND);
    }
  }

  async createCart(cartDto: CartDto): Promise<Cart> {
    const { product_code, qty } = cartDto;
    await this.validateCart(cartDto);
    const product: Product = await this.productRepository.findOneOrFail({
      code: product_code,
    });

    return await this.initialCart(product, qty);
  }

  async updateCartItem(id: number, cartDto: CartDto): Promise<Cart> {
    const { product_code, qty } = cartDto;
    await this.validateCart(cartDto);
    const product: Product = await this.productRepository.findOneOrFail({
      code: product_code,
    });

    return await this.updateCart(id, product, qty);
  }

  async deleteCartItem(id: number, item_id: number): Promise<Cart> {
    const connection = await getConnection();
    const entityManager = connection.createEntityManager();
    const cart: Cart = await this.getCartById(id);
    const cartItemToDelete: CartItem = await entityManager.findOne(
      CartItem,
      item_id,
    );

    if (!cartItemToDelete) {
      throw new HttpException(
        { message: 'Cart item id not fuound' },
        HttpStatus.NOT_FOUND,
      );
    }

    cart.items = cart.items.filter(item => item.id !== cartItemToDelete.id);
    cart.price = this.getCartPrice(cart);
    return await entityManager.save(cart);
  }

  private async updateCart(id: number, product: Product, qty: number) {
    const connection = await getConnection();
    const entityManager = connection.createEntityManager();
    const cart: Cart = await entityManager.findOneOrFail(Cart, id, {
      relations: ['items', 'items.product'],
    });
    const cartItems: CartItem[] = cart.items;
    if (cartItems.some(item => item.product.id === product.id)) {
      const mapNewQty = item => {
        if (item.product.id === product.id) {
          item.qty = qty;
        }
        return item;
      };
      cart.items = cartItems.map(mapNewQty);
    } else {
      const cartItem: CartItem = new CartItem();
      cartItem.product = product;
      cartItem.qty = qty;
      await connection.manager.save(cartItem);
      cart.items = [...cartItems, cartItem];
    }

    cart.items = cart.items.filter(item => item.qty !== 0);
    cart.price = this.getCartPrice(cart);

    return await entityManager.save(cart);
  }

  private async initialCart(product: Product, qty: number): Promise<Cart> {
    const connection = await getConnection();
    const cartItem: CartItem = new CartItem();
    cartItem.product = product;
    cartItem.qty = qty;
    await connection.manager.save(cartItem);

    const cart: Cart = new Cart();
    cart.items = [cartItem];
    cart.price = this.getCartPrice(cart);
    return await connection.manager.save(cart);
  }

  private getCartPrice(cart: Cart) {
    return cart.items.reduce(
      (total, item) => item.product.price * item.qty + total,
      0,
    );
  }

  private async validateCart(cartDto: CartDto) {
    const { product_code, qty } = cartDto;
    try {
      const product: Product = await this.productRepository.findOneOrFail({
        code: product_code,
      });
      if (product.qty < qty) {
        throw new NotAcceptableException('insufficient stock');
      }
    } catch (error) {
      throw new HttpException(
        { message: error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
