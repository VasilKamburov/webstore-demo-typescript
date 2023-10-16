import { CreateProductDto } from "./models/create-product.dto";
import { Product } from "./models/product.entity";

export class ProductMapper {
    createFromDto(productDto: CreateProductDto): Product {
        const {title, description, size, colour, quantityAvailable} = productDto;
        let product: Product = new Product;
        product.title = title;
        product.description = description;
        product.size = size;
        product.colour = colour;
        product.quantityAvailable = quantityAvailable;
        return product;
    }
}