import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMoveDto } from './dto/create-move.dto';
import { UpdateMoveDto } from './dto/update-move.dto';
import { Move } from './entities/move.entity';
import { User } from '../users/entities/user.entity';
import { Loan } from 'src/loan/entities/loan.entity';

@Injectable()
export class MovesService {

  constructor(
    @InjectRepository(Move)
    private readonly moveRepository: Repository<Move>
  ){}

  create(loan: Loan, user:User, quantity: number, isAdd: boolean = false) {
    return this.moveRepository.create({
      loan,
      isAdd,
      quantity,
      user
    })
  }

  findAll() {
    return `This action returns all moves`;
  }

  findOne(id: number) {
    return `This action returns a #${id} move`;
  }

  update(id: number, updateMoveDto: UpdateMoveDto) {
    return `This action updates a #${id} move`;
  }

  remove(id: number) {
    return `This action removes a #${id} move`;
  }
}
