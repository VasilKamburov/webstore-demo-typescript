import { IsOptional, IsString } from "class-validator";

export class AddressCreationDto{
    @IsString()
    city: string;

    @IsString()
    street: string;
    
    @IsString()
    @IsOptional()
    additionalNotes?: string;
}