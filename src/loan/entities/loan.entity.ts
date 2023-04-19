import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Move } from '../../moves/entities/move.entity';
import { Product } from 'src/products/entities/product.entity';

@Entity({name: 'loans'})
export class Loan {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    quantity: number;

    // @Column()
    // remainingQuantity: number;

    // * Relations

    @OneToMany(
        () => Move,
        (move) => move.loan
    )
    history: Move[];

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

    @ManyToOne(
        () => Product,
        (product) => product.loans 
    )
    product: Product;

    







    // @Column()
    // date: Date;

    // @Column({
    //     default: false
    // })
    // isComplete: boolean;


    // Relations
    // @ManyToOne(
    //     () => User,
    //     (user) => user.myLoans
    // )
    // client: User;

    // @ManyToOne(
    //     () => User,
    //     (user) => user.loansCreated,
    // )
    // user: User;

    // @OneToMany(
    //     () => DetailLoan,
    //     (detailLoan) => detailLoan.loan,
    //     {
    //         cascade: ['insert'],
    //     }
    // )
    // details: DetailLoan[];

    // @OneToMany(
    //     () => Move,
    //     (move) => move.loan,
    //     {
    //         cascade: ['insert'],
    //     }
    // )
    // moves: Move[];
    

}
