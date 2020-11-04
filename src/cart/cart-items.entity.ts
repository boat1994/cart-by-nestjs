import { ProductsEntity } from 'src/products/products.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { CartEntity } from './cart.entity';

@Entity('cart_items')
export class CartItemEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column() 
    qty: number

    @OneToOne(() => ProductsEntity)
    @JoinColumn()
    product: ProductsEntity

    @OneToOne(() => CartEntity)
    @JoinColumn()
    cart: CartEntity

}