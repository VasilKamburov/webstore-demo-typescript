import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { TargetedList } from "./targeted-list.enum";

export class ChangeItemInListDto {
    @IsNotEmpty()
    @IsEnum(TargetedList)
    targetedList: TargetedList;

    @IsString()
    productId: string;
}