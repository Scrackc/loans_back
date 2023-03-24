import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMoveDto } from './dto/create-move.dto';
import { UpdateMoveDto } from './dto/update-move.dto';
import { Move } from './entities/move.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class MovesService {

  constructor(
    @InjectRepository(Move)
    private readonly moveRepository: Repository<Move>
  ){}

  create(createMoveDto: CreateMoveDto, user:User) {
    return this.moveRepository.create({
      ...createMoveDto,
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
