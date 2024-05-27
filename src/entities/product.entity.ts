import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from 'typeorm'

@Entity('productList')
export class ProductList {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 30 })
    title!: string;

    @Column({ type: 'int' })
    originalPrice!: number;

    @Column({ type: 'int'})
    price!: number;

    @Column({ type: 'int' })
    discountRate!: number;

    @Column({ type: 'text', nullable: true })
    thumbNailImage: string = '';

    @Column({ type: 'tinyint' })
    isDeleted: number = 0;

    @CreateDateColumn()
    createdAt!: Timestamp;

    @UpdateDateColumn()
    updatedAt!: Timestamp;

}