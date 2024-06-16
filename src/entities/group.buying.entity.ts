import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Timestamp } from 'typeorm'
import { SelectedProduct } from './selected.product.entity'
import { PurchaseProduct } from './purchase.product.entity'
import { Product } from './product.entity'


@Entity('group_buying')
export class GroupBuying {
    @PrimaryGeneratedColumn('increment')
    id!: number

    @ManyToOne(() => Product, (product) => product.groupBuying)
    product!: Product;

    @OneToMany(type => PurchaseProduct, (purchaseProduct) => purchaseProduct.groupBuying)
    purchaseProducts?: PurchaseProduct[];

    @Column({ type: 'tinyint' })
    status?: number

    @CreateDateColumn()
    createdAt!: Timestamp

    @CreateDateColumn()
    updatedAt!: Timestamp
}