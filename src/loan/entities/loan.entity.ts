import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { DetailLoan } from '../../detail-loan/entities/detail-loan.entity';
import { Move } from '../../moves/entities/move.entity';

@Entity({name: 'loans'})
export class Loan {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    date: Date;

    @Column({
        default: false
    })
    isComplete: boolean;


    // Relations
    @ManyToOne(
        () => User,
        (user) => user.myLoans
    )
    client: User;

    @ManyToOne(
        () => User,
        (user) => user.loansCreated,
    )
    user: User;

    @OneToMany(
        () => DetailLoan,
        (detailLoan) => detailLoan.loan,
        {
            cascade: ['insert'],
        }
    )
    details: DetailLoan[];

    @OneToMany(
        () => Move,
        (move) => move.loan,
        {
            cascade: ['insert'],
        }
    )
    moves: Move[];
    

}
