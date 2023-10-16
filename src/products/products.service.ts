import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './models/product.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateProductDto } from './models/create-product.dto';
import { ProductMapper } from './product.mapper';
import { NegativeQuantityException } from './exceptions/negative-quantity.exception';

@Injectable()
export class ProductsService {
    
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
        private productMapper: ProductMapper
    ) {}
    
    async findAllProducts(): Promise<Product[]> {
        return await this.productRepository.find();
    } 

    async findProductById(id: string): Promise<Product | undefined> {
        let product: Product = await this.productRepository.findOne({ where: { id } });

        if (!product) {
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }

        return product;
    }

    async changeProductQuantity(id: string, newNum: number): Promise<UpdateResult> {
        if (newNum < 0) {
          throw new NegativeQuantityException();
        }
        let product = await this.findProductById(id);
        product.quantityAvailable = newNum;
        return await this.productRepository.update(id, product);
    }

    async deleteProductById(id: string): Promise<DeleteResult> {
        return await this.productRepository.delete(id);
    }

    async createProduct(createProductDto: CreateProductDto): Promise<Product> {
        let product: Product = this.productMapper.createFromDto(createProductDto);
        return await this.productRepository.save(product);
    }
}
