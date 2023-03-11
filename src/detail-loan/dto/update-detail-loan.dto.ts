import { PartialType } from '@nestjs/mapped-types';
import { CreateDetailLoanDto } from './create-detail-loan.dto';

export class UpdateDetailLoanDto extends PartialType(CreateDetailLoanDto) {}
