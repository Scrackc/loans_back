import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { LoanModule } from './loan/loan.module';
import { DetailLoanModule } from './detail-loan/detail-loan.module';
import { MovesModule } from './moves/moves.module';
import { CommonModule } from './common/common.module';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      password: process.env.DB_PASSWORD,
      username: process.env.DB_USERNAME,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      synchronize: true,
      autoLoadEntities: true
    }),
    UsersModule, LoanModule, DetailLoanModule, MovesModule, CommonModule, ProductsModule, AuthModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
