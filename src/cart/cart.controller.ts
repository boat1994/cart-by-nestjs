import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CartDto } from './dto/cart.dto';

import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get('/:id')
  async getCart(@Param() params) {
    return await this.cartService.getCartById(params.id);
  }

  @UsePipes(new ValidationPipe())
  @Post('/')
  async createCart(@Body() cartDto: CartDto) {
    return await this.cartService.createCart(cartDto);
  }

  @UsePipes(new ValidationPipe())
  @Put('/:id')
  async updateCartItem(@Param() param, @Body() cartDto: CartDto) {
    return await this.cartService.updateCartItem(param.id, cartDto);
  }

  @Delete('/:id/items/:item_id')
  async deleteCartItem(@Param() param) {
    return await this.cartService.deleteCartItem(param.id, param.item_id);
  }
}
