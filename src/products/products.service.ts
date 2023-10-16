import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './models/product.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class ProductsService {
    

    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
    ) {}
    
    async findAllProducts(): Promise<Product[]> {
        return await this.productRepository.find();
    } 

    async findProductById(id): Promise<Product> {
        return await this.productRepository.findOneBy(id);
    }

    async deleteProductById(id: string): Promise<DeleteResult> {
        return await this.productRepository.delete(id);
    }
}
