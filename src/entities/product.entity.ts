import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    Timestamp,
    ManyToOne, OneToMany, OneToOne, JoinColumn,
} from 'typeorm'
import { Option } from './option.entity'
import { OptionCombination } from './option.combination.entity'
import { Category } from './category.entity'
import { GroupBuying } from './group.buying.entity'

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
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
 *         petType:
 *           type: integer
 *           description: 대상 반려동물 종류
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
 *         - petType
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

    @Column({ type: 'tinyint', default: 0 })
    petType: number = 0;

    @OneToMany(() => GroupBuying, (groupBuying) => groupBuying.product)
    groupBuying!: GroupBuying[];

    @OneToMany(() => Option, option => option.product, { nullable: true })
    options?: Option[];

    @OneToMany(() => OptionCombination, optionCombination => optionCombination.product, { nullable: true })
    optionCombinations?: OptionCombination[];

    @OneToOne(() => Category, (category: { product: any; }) => category.product, { nullable: true })
    @JoinColumn()
    category?: Category;

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