import { Injectable } from '@nestjs/common';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Loan } from './entities/loan.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { DetailLoanService } from '../detail-loan/detail-loan.service';
import { ReturnLoanDto } from './dto/return-loan.dto';

@Injectable()
export class LoanService {

  constructor(
    @InjectRepository(Loan)
    private readonly loanRepository: Repository<Loan>,
    private readonly detail: DetailLoanService
  ){}

  async create(createLoanDto: CreateLoanDto, user: User) {

    const {details, idClient} = createLoanDto;
    try {
      const loan = this.loanRepository.create({
        client: {
          id: idClient
        },
        details: details.map( dt => this.detail.create({productId: dt.productId, quantity: dt.quantity})),
        date: new Date(),
        user,
      });
      return await this.loanRepository.save(loan);
    } catch (error) {

      return error;
    }
    
  }

  findAll() {
    return this.loanRepository.find({
      relations:{
        client: true,
        user: true
      }
    });
  }

  findOne(id: string) {
    return this.loanRepository.findOne({
      where: {
        id
      },
      relations: {
        client: true,
        user: true,
        details: {
          product: true
        },
      }
    })
  }

  async returnProduct(idLoan: string, returnLoanDto: ReturnLoanDto){
    const { idProduct, quantity} = returnLoanDto;
    await this.detail.update(idLoan,idProduct, quantity);
    const detail = await this.loanRepository.findOne({ where: {id: idLoan}, relations: {details: true}},);
    const isCompleted = detail.details.every( dt => dt.remainingQuantity === 0);
    if(isCompleted){
      detail.isComplete = true;
      await this.loanRepository.save(detail);
    }

    return detail;
  }


  update(id: number, updateLoanDto: UpdateLoanDto) {
    return `This action updates a #${id} loan`;
  }

  remove(id: number) {
    return `This action removes a #${id} loan`;
  }
}
