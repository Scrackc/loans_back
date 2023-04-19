import { Type } from "class-transformer";
import { IsDate, IsInt, IsNotEmpty, IsUUID, ValidateNested } from "class-validator";


export class CreateLoanDto {
    @IsUUID()
    idClient: string;

    @IsUUID()
    idProduct: string;

    @IsInt()
    quantity: number;

    // @IsDate()
    // date: Date;
}
