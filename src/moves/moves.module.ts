import { Module } from '@nestjs/common';
import { MovesService } from './moves.service';
import { MovesController } from './moves.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Move } from './entities/move.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Move])
  ],
  controllers: [MovesController],
  providers: [MovesService],
  exports: [MovesService]
})
export class MovesModule {}
