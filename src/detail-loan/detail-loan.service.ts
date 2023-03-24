import {  BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDetailLoanDto } from './dto/create-detail-loan.dto';
import { UpdateDetailLoanDto } from './dto/update-detail-loan.dto';
import { DetailLoan } from './entities/detail-loan.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';

@Injectable()
export class DetailLoanService {
  constructor(
    @InjectRepository(DetailLoan)
    private readonly detailRepository: Repository<DetailLoan>
  ){}

  create(createDetailLoanDto: CreateDetailLoanDto) {
    return this.detailRepository.create({
      ...createDetailLoanDto,

      remainingQuantity: createDetailLoanDto.quantity
    });
  }

  findAll() {
    return `This action returns all detailLoan`;
  }

  async findOne(loanId: string, productId: string) {
    return await this.detailRepository.findOne({ where: { loanId, productId } });
  }

  async update(loanId: string, productId: string, numberItems: number, user:User) {
    const detailUpdate = await this.detailRepository.findOne({where: {loanId, productId}});

    if(detailUpdate.remainingQuantity - numberItems < 0) throw new BadRequestException("Cantidad invalida");
    detailUpdate.remainingQuantity -= numberItems;
    return this.detailRepository.save(detailUpdate);
    
  }

  remove(id: number) {
    return `This action removes a #${id} detailLoan`;
  }
}
