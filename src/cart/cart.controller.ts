import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';

import { CartService } from './cart.service';
import { CreateCartDto } from './dto'

@Controller('cart')
export class CartController {

    constructor(private readonly cartService: CartService) {}
    
    @Get('/:id')
    async getCart(@Param() params) {
        return await this.cartService.getCartById(params.id)
    }

    @UsePipes(new ValidationPipe())
    @Post('/')
    async createCart(@Body() createCartDto: CreateCartDto) {
        return await this.cartService.createCart(createCartDto); 
    }
}
