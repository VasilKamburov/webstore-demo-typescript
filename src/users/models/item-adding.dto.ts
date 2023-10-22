import { IsString } from "class-validator";

export class ChangeItemInListDto {
    @IsString()
    listToAddTo: string;

    @IsString()
    productId: string;
}