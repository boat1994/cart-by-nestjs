import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/products/products.entity';

import { CartController } from './carts.controller';
import { Cart } from './carts.entity';
import { CartService } from './carts.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Cart, Product])
    ],
    controllers: [CartController],
    providers: [CartService],
})
export class CartModule {
 
}
