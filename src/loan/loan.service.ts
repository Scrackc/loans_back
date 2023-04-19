import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Loan } from './entities/loan.entity';
import { DataSource, Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { ReturnLoanDto } from './dto/return-loan.dto';
import { MovesService } from '../moves/moves.service';

@Injectable()
export class LoanService {

  constructor(
    @InjectRepository(Loan)
    private readonly loanRepository: Repository<Loan>,
    private readonly moves: MovesService,
    private readonly dataSource: DataSource,

  ) { }

  async hanldeLoan(createLoanDto: CreateLoanDto, user: User) {
    const existingLoan = await this.loanRepository.findOne({
      where: { client: { id: createLoanDto.idClient }, product: { id: createLoanDto.idProduct } }
    });
    
    try {

      if (existingLoan) { // * Loan exist (increment the quantity)
        return existingLoan;
       return await this.addLoan(createLoanDto.quantity, existingLoan, user);
      }else{
        return await this.createLoan(createLoanDto, user)
      }
      
    } catch (error) {
      return {
        msg: 'errrrr'
      }
    }

  }
  private async createLoan(createLoanDto: CreateLoanDto, user: User) {
    const {idClient,idProduct,quantity} = createLoanDto;
    // * start transaction
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      // Save loan
      const loan = this.loanRepository.create({
        client: {
          id: idClient
        },
        user,
        product: {
          id: idProduct
        },
        quantity,
      })
      await queryRunner.manager.save(loan);

      // Savel move
      // Save Move
      const move = this.moves.create(loan, user, quantity, true);
      await queryRunner.manager.save(move);

      await queryRunner.commitTransaction();

      // TODO Return 
      return loan;

    } catch (error) {
      await queryRunner.rollbackTransaction();
      return error;
    } finally {
      await queryRunner.release();
    }
  }
  private async addLoan(quantity: number, loan: Loan, user: User) {
    loan.quantity += quantity;

    // * start transaction
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {

      // Save loan changes
      await queryRunner.manager.save(loan);

      // Save Move
      const move = this.moves.create(loan, user, quantity, true);
      await queryRunner.manager.save(move);


      await queryRunner.commitTransaction();
      // TODO Devolver la actualizacion del loan
      return loan;

    } catch (error) {
      await queryRunner.rollbackTransaction();
      return error;
    } finally {
      await queryRunner.release();
    }

  }

  

  findAll() {
    return this.loanRepository.find({
      relations: {
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
        history: {
          user: true
        }
      }
    })
  }

  
  async returnProduct(idLoan: string, returnLoanDto: ReturnLoanDto, user: User) {

    // Params query
    const { quantity } = returnLoanDto;

    // Find loan
    const loan = await this.loanRepository.findOne({ where: { id: idLoan }, relations: { history: true } });
    // Validate exist loan
    if (!loan) throw new NotFoundException(`Loan with id ${idLoan} not exist`);

    // Query runner 
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      
      // Validate detail
      if (loan.quantity - quantity < 0) throw new BadRequestException("Cantidad invalida");
      // Update value
      loan.quantity -= quantity;
      // save
      await queryRunner.manager.save(loan);

      // Create move
      const move = this.moves.create(loan, user, quantity);
      // save 
      await queryRunner.manager.save(move);

      await queryRunner.commitTransaction();

      return {
        loan
      }

    } catch (error) {
      await queryRunner.rollbackTransaction();
      return error;
    } finally {
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
