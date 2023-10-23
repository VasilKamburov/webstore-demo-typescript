import { IsEnum, IsInt, IsNotEmpty, IsNumber, IsNumberString, Min } from "class-validator";
import { Size } from "./size.enum";

export class CreateProductDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    @IsEnum(Size)
    size: Size;

    @IsNotEmpty()
    colour: string;

    @IsInt()
    @Min(0)
    quantityAvailable: number;
}