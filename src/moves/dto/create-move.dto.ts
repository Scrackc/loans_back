import { IsNumber, IsUUID } from 'class-validator';

export class CreateMoveDto {

    @IsNumber()
    quantity: number;

    @IsUUID()
    productId: string;

    @IsUUID()
    loanId: string;

}
