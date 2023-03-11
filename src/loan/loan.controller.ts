import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { LoanService } from './loan.service';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { GetUser } from '../common/decorators/get-user.decorator';
import { User } from '../users/entities/user.entity';
import { ReturnLoanDto } from './dto/return-loan.dto';

@Controller('loan')
export class LoanController {
  constructor(private readonly loanService: LoanService) {}

  @Auth()
  @Post()
  create(
    @Body() createLoanDto: CreateLoanDto,
    @GetUser() user: User
  ) {
    return this.loanService.create(createLoanDto, user);
  }

  @Get()
  async findAll() {
    // throw new BadRequestException('Error generado');
    return { loans: await this.loanService.findAll(), };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.loanService.findOne(id);
  }

  @Auth()
  @Patch(':id')
  algo(
    @Body() returnLoanDto:ReturnLoanDto,
    @Param('id') id: string
  ){
    return this.loanService.returnProduct(id, returnLoanDto);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLoanDto: UpdateLoanDto) {
    return this.loanService.update(+id, updateLoanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.loanService.remove(+id);
  }
}
