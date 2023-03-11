import { IsInt,IsPositive,IsUUID} from "class-validator";

export class ReturnLoanDto {

    @IsUUID()
    idProduct: string;

    @IsInt()
    @IsPositive()
    quantity: number;

}
