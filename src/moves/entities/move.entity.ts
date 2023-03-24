import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Loan } from '../../loan/entities/loan.entity';
import { Product } from '../../products/entities/product.entity';
import { User } from '../../users/entities/user.entity';

@Entity({name: "moves"})
export class Move {

    @PrimaryGeneratedColumn('increment')
    id: number;

    
    @Column()
    quantity: number;
    
    @CreateDateColumn()
    date: Date;
    
    // For relations
    @Column()
    loanId: string;
    @Column()
    productId: string;
    // Relations
    @ManyToOne(
        () => Loan,
        (loan) => loan.moves 
    )
    @JoinColumn({ name: 'loanId' })
    loan: Loan;

    @ManyToOne(
        () => Product,
        (product) => product.moves
    )
    @JoinColumn({ name: 'productId' })
    product: Product;

    @ManyToOne(
        () => User,
        (user) => user.moves
    )
    user: User;

}
