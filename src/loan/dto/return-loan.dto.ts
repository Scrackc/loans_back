import { IsInt,IsPositive,IsUUID} from "class-validator";

export class ReturnLoanDto {

    @IsInt()
    @IsPositive()
    quantity: number;

}
