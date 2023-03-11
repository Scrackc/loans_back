import { Module } from '@nestjs/common';
import { DetailLoanService } from './detail-loan.service';
import { DetailLoanController } from './detail-loan.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetailLoan } from './entities/detail-loan.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([DetailLoan])
  ],
  controllers: [DetailLoanController],
  providers: [DetailLoanService],
  exports: [DetailLoanService]
})
export class DetailLoanModule {}
