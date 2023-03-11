import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DetailLoan } from '../../detail-loan/entities/detail-loan.entity';
import { Move } from '../../moves/entities/move.entity';

@Entity({name: 'products'})
export class Product {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    // Relations

    @OneToMany(
        () => DetailLoan,
        (detailLoan) => detailLoan.product
    )
    loans: DetailLoan[];

    @OneToMany(
        () => Move,
        (move) => move.product
    )
    moves: Move[];
}
