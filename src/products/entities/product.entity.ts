import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Loan } from 'src/loan/entities/loan.entity';

@Entity({name: 'products'})
export class Product {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    // * Relations
    @OneToMany(
        () => Loan,
        (loan) => loan.product 
    )
    loans: Loan[];



    // Relations
    // @OneToMany(
    //     () => DetailLoan,
    //     (detailLoan) => detailLoan.product
    // )
    // loans: DetailLoan[];

    // @OneToMany(
    //     () => Move,
    //     (move) => move.product
    // )
    // moves: Move[];
}
