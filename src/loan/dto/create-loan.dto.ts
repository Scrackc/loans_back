import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsUUID, ValidateNested } from "class-validator";
import { CreateDetailLoanDto } from '../../detail-loan/dto/create-detail-loan.dto';

export class CreateLoanDto {
    @IsUUID()
    idClient: string;

    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => CreateDetailLoanDto)
    details: CreateDetailLoanDto[];

    // @IsDate()
    // date: Date;
}
