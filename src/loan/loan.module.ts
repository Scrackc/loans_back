import { Module } from '@nestjs/common';
import { LoanService } from './loan.service';
import { LoanController } from './loan.controller';
import { Loan } from './entities/loan.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetailLoanModule } from '../detail-loan/detail-loan.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Loan]),
    DetailLoanModule
  ],
  controllers: [LoanController],
  providers: [LoanService]
})
export class LoanModule {}
