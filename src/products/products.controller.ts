import { Controller, Delete, Get, Param } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './models/product.entity';
import { DeleteResult } from 'typeorm';

@Controller('products')
export class ProductsController {

    constructor(private productsService: ProductsService) {}

    @Get()
    getAllProducts(): Promise<Product[]> {
        return this.productsService.findAllProducts();
    }

    @Get('/:id')
    getProductById(@Param('id') id: string): Promise<Product> {
        return this.productsService.findProductById(id);
    }

    @Delete('/:id')
    deleteProductById(@Param('id') id: string): Promise<DeleteResult> {
        return this.productsService.deleteProductById(id);
    }
}
