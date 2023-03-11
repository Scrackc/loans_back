import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DetailLoanService } from './detail-loan.service';
import { CreateDetailLoanDto } from './dto/create-detail-loan.dto';
import { UpdateDetailLoanDto } from './dto/update-detail-loan.dto';

@Controller('detail-loan')
export class DetailLoanController {
  constructor(private readonly detailLoanService: DetailLoanService) {}

  @Post()
  create(@Body() createDetailLoanDto: CreateDetailLoanDto) {
    return this.detailLoanService.create(createDetailLoanDto);
  }

  @Get()
  findAll() {
    return this.detailLoanService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.detailLoanService.findOne(+id);
  }



  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.detailLoanService.remove(+id);
  }
}
