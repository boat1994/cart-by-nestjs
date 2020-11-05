import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartModule } from './carts/carts.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    CartModule, 
    ProductsModule,
  ]
})  
export class AppModule {}
