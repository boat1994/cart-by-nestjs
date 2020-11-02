import { Module } from '@nestjs/common';
import { CartModule } from './cart/cart.module';
import { DatabaseModule } from './database/database.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [CartModule, ProductsModule]
})  
export class AppModule {}
