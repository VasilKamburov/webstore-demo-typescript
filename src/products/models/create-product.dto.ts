import { IsInt, IsNotEmpty, IsNumber, IsNumberString, Min } from "class-validator";

export class CreateProductDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    size: string;

    @IsNotEmpty()
    colour: string;

    @IsInt()
    @Min(0)
    quantityAvailable: number;
}