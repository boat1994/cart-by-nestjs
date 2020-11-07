import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/products/products.entity';

import { CartController } from './cart.controller';
import { Cart } from './cart.entity';
import { CartService } from './cart.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Cart, Product])
    ],
    controllers: [CartController],
    providers: [CartService],
})
export class CartModule {
 
}
