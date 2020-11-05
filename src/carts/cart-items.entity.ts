import { Product } from 'src/products/products.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Cart } from './carts.entity';

@Entity('cart_items')
export class CartItem {

    @PrimaryGeneratedColumn()
    id: number

    @Column() 
    qty: number

    @OneToOne(() => Product)
    @JoinColumn()
    product: Product

    @OneToOne(() => Cart)
    @JoinColumn()
    cart: Cart

}