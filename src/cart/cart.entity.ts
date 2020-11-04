import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { CartItemEntity } from './cart-items.entity';

@Entity('carts')
export class CartEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column() 
    price: number

    @OneToMany(() => CartItemEntity, cartItem => cartItem.cart)
    items: CartItemEntity[]
}