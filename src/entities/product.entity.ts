import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    Timestamp,
    ManyToOne, OneToMany,
} from 'typeorm'
import { Option } from './option.entity'
import { OptionCombination } from './option.combination.entity'

/**
 * @swagger
 * components:
 *   schemas:
 *     ProductList:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: 고유 ID
 *         title:
 *           type: string
 *           description: 상품명
 *         originalPrice:
 *           type: integer
 *           description: 원가
 *         price:
 *           type: integer
 *           description: 판매가
 *         thumbNailImage:
 *           type: string
 *           nullable: true
 *           description: 썸네일 이미지
 *         isDeleted:
 *           type: integer
 *           description: 삭제 여부
 *         createdAt:
 *           type: string
 *           format: Timestamp
 *           description: 생성일
 *         updatedAt:
 *           type: string
 *           format: Timestamp
 *           description: 수정일
 *       required:
 *         - id
 *         - title
 *         - originalPrice
 *         - price
 *         - discountRate
 *         - isDeleted
 *         - createdAt
 *         - updatedAt
 */

@Entity('product')
export class Product {
    /**
     * 고유 ID
     */
    @PrimaryGeneratedColumn()
    id!: number;

    /**
     * 상품명
     */
    @Column({ type: 'varchar', length: 60 })
    title!: string;

    /**
     * 원가
     */
    @Column({ type: 'int' })
    originalPrice!: number;

    /**
     * 판매가
     */
    @Column({ type: 'int'})
    price!: number;

    /**
     * 썸네일이미지
     */
    @Column({ type: 'text', nullable: true })
    thumbNailImage: string = '';

    /**
     * 삭제여부
     */
    @Column({ type: 'tinyint', default: 0 })
    isDeleted: number = 0;

    @OneToMany(() => Option, option => option.productId)
    options?: Option[];

    @OneToMany(() => OptionCombination, optionCombination => optionCombination.productId, { nullable: true })
    optionCombinations?: OptionCombination[];

    /**
     * 생성일
     */
    @CreateDateColumn()
    createdAt!: Timestamp;


    /**
     * 수정일
     */
    @UpdateDateColumn()
    updatedAt!: Timestamp;
}