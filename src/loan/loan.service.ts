import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Loan } from './entities/loan.entity';
import { DataSource, Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { DetailLoanService } from '../detail-loan/detail-loan.service';
import { ReturnLoanDto } from './dto/return-loan.dto';
import { MovesService } from '../moves/moves.service';

@Injectable()
export class LoanService {

  constructor(
    @InjectRepository(Loan)
    private readonly loanRepository: Repository<Loan>,
    private readonly detail: DetailLoanService,
    private readonly moves: MovesService,
    private readonly dataSource: DataSource,

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
        moves: {
          product: true,
          user: true
        }
      }
    })
  }

  async returnProduct(idLoan: string, returnLoanDto: ReturnLoanDto, user:User){

    // Params query
    const { idProduct, quantity } = returnLoanDto;

    // Find loan
    const loan = await this.loanRepository.findOne({ where: { id: idLoan }, relations: { details: true } });
    // Validate exist loan
    if(!loan) throw new NotFoundException(`Loan with id ${idLoan} not exist`);
    
    // Query runner 
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Find the detail
      const detail = await this.detail.findOne(idLoan, idProduct);
      // Validate if details exist
      if(!detail) throw new NotFoundException('This product not found in this loan');
      // Validate detail
      if (detail.remainingQuantity - quantity < 0) throw new BadRequestException("Cantidad invalida");
      // Update value
      detail.remainingQuantity -= quantity;
      // save
      await queryRunner.manager.save(detail);      

      // Create move
      const move = this.moves.create({ loanId: idLoan,productId: idProduct, quantity}, user);
      // save 
      await queryRunner.manager.save(move);

      // Validate the complete loan 
      // TODO Validar esta funcion o solo tomar la desicion basada en los detalles
      // Replazar el detalle actualizado
      const isComplete = loan.details.map(dt => {
        if(dt.productId == idProduct) return detail;
        return dt;
      }).every(dt => dt.remainingQuantity === 0);

      delete loan.details;
      if (isComplete) {
        loan.isComplete = true;
        await this.loanRepository.save(loan);
      }

      await queryRunner.commitTransaction();

      return{
        loan
      }

    } catch (error) {
      await queryRunner.rollbackTransaction();
      return error;
    }finally{
      await queryRunner.release();
    }

  }


  update(id: number, updateLoanDto: UpdateLoanDto) {
    return `This action updates a #${id} loan`;
  }

  remove(id: number) {
    return `This action removes a #${id} loan`;
  }
}
