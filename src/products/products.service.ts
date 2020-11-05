import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './products.entity';

@Injectable()
export class ProductsService {

    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>
    ) {}

    get(): Promise<Product[]> {
        return this.productRepository.find()
    }

    async create(createProductDto: CreateProductDto): Promise<Product> {

        const existsProduct: Product = await this.productRepository.findOne({code: createProductDto.code})

        if (existsProduct) {
            throw new HttpException({message: `The product code "${createProductDto.code}" is exists.`}, HttpStatus.BAD_REQUEST)
        }
        
        return this.productRepository.save(createProductDto)
    }

    delete(id: number): Promise<DeleteResult> {
        return  this.productRepository.delete(id);
    }
}
