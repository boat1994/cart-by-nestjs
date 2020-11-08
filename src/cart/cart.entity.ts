import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { CartItem } from './cart-items.entity';

@Entity('carts')
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @OneToMany(
    () => CartItem,
    cartItem => cartItem.cart,
  )
  items: CartItem[];
}
