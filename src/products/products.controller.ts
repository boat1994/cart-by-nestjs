import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Get()
  async get() {
    return await this.productService.get();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createProductDto: CreateProductDto) {
    return await this.productService.create(createProductDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.productService.delete(id);
  }
}
