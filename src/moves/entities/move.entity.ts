import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Loan } from '../../loan/entities/loan.entity';
import { Product } from '../../products/entities/product.entity';
import { User } from '../../users/entities/user.entity';

@Entity({name: "moves"})
export class Move {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    detail: string;

    @Column()
    quantity: number;

    // Relations
    @ManyToOne(
        () => Loan,
        (loan) => loan.moves 
    )
    loan: Loan;

    @ManyToOne(
        () => Product,
        (product) => product.moves
    )
    product: Product;

    @ManyToOne(
        () => User,
        (user) => user.moves
    )
    user: User;

}
