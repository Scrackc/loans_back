import { Module } from '@nestjs/common';
import { LoanService } from './loan.service';
import { LoanController } from './loan.controller';
import { Loan } from './entities/loan.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetailLoanModule } from '../detail-loan/detail-loan.module';
import { MovesModule } from '../moves/moves.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Loan]),
    DetailLoanModule,
    MovesModule
  ],
  controllers: [LoanController],
  providers: [LoanService]
})
export class LoanModule {}
