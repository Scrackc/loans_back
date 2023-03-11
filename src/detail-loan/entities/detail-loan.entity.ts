import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Loan } from '../../loan/entities/loan.entity';
import { Product } from '../../products/entities/product.entity';
@Entity({name: 'loanDetail'})
export class DetailLoan {

    @PrimaryColumn()
    loanId: string;

    @PrimaryColumn()
    productId: string;

    @Column()
    quantity: number;
    
    @Column()
    remainingQuantity: number;

    // Relations
    @ManyToOne(
        () => Loan,
        (loan) => loan.details,
    )
    @JoinColumn({ name: 'loanId' })
    loan: Loan;

    @ManyToOne(
        () => Product,
        (product) => product.loans,
        {
            onDelete: 'CASCADE'
        }
    )
    @JoinColumn({name: 'productId'})
    product: Product;



}
