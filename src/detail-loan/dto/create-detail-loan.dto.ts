import { IsInt, IsUUID } from "class-validator";

export class CreateDetailLoanDto {
    @IsInt()
    quantity: number;

    @IsUUID()
    productId: string;
}
