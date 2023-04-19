import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Loan } from '../../loan/entities/loan.entity';
import { Move } from '../../moves/entities/move.entity';

@Entity({name:'users'})
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column({
        nullable: true
    })
    address: string;

    @Column({
        select: false
    })
    password: string;

    @Column()
    role: string;

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    // * Relations
    @OneToMany(
        () => Loan,
        (loan) => loan.client
    )
    myLoans: Loan[];

    @OneToMany(
        () => Loan,
        (loan) => loan.user
    )
    loansCreated: Loan[];

    @OneToMany(
        () => Move,
        (move) => move.user
    )
    moves: Move[];


    // Relations

    // @OneToMany(
    //     () => Loan,
    //     (loan) => loan.client
    // )
    // myLoans: Loan[];

    // @OneToMany(
    //     () => Loan,
    //     (loan) => loan.user,
    // )
    // loansCreated: Loan[]

    // @OneToMany(
    //     () => Move,
    //     (move) => move.user
    // )
    // moves: Move[];

}
