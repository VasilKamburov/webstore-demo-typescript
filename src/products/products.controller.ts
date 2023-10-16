import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './models/product.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CreateProductDto } from './models/create-product.dto';

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

    @Post()
    createProduct(@Body() createProductDto: CreateProductDto): Promise<Product> {
        return this.productsService.createProduct(createProductDto);
    }

    @Put('/:id')
    updateProductAvailability(@Param('id') id: string, @Body('quantity') newQuantity: number): Promise<UpdateResult> {
        return this.productsService.changeProductQuantity(id, newQuantity);
    }

    @Delete('/:id')
    deleteProductById(@Param('id') id: string): Promise<DeleteResult> {
        return this.productsService.deleteProductById(id);
    }
}
