import { Product } from 'src/products/products.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Cart } from './cart.entity';

@Entity('cart_items')
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  qty: number;

  @ManyToOne(() => Product)
  @JoinColumn()
  product: Product;

  @OneToOne(() => Cart)
  @JoinColumn()
  cart: Cart;
}
