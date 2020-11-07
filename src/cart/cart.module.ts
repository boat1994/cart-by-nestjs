import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsEntity } from 'src/products/products.entity';

import { CartController } from './cart.controller';
import { CartEntity } from './cart.entity';
import { CartService } from './cart.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([CartEntity, ProductsEntity])
    ],
    controllers: [CartController],
    providers: [CartService],
})
export class CartModule {
 
}
