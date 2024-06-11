import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, Timestamp, OneToMany } from 'typeorm'
import { Category, Product, Option, OptionCombination, Review } from '../entities'

/**
 * @swagger
 * components:
 *   schemas:
 *     ProductDetail:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: 고유 ID
 *         productId:
 *           type: integer
 *           description: 상품 참조 키
 *         categoryId:
 *           type: integer
 *           description: 카테고리 참조 키
 *         productImages:
 *           type: string
 *           description: 상품 이미지
 *         descriptionImages:
 *           type: string
 *           description: 설명 이미지
 *         inventory:
 *           type: integer
 *           description: 재고
 *         description:
 *           type: string
 *           description: 설명
 *         createdAt:
 *           type: string
 *           format: timestamp
 *           description: 생성일
 *       required:
 *         - id
 *         - productId
 *         - categoryId
 *         - inventory
 *         - createdAt
 */

@Entity()
export class ProductDetail {
    /**
     * 고유 ID
     */
    @PrimaryGeneratedColumn()
    id?: number;

    /**
     * 상품 참조 키
     */
    @ManyToOne(() => Product, product => product.id, { nullable: true })
    productId?: Product;

    /**
     * review 관계 설정
     */
    @OneToMany(() => Review, review => review.id, { nullable: true })
    reviews?: Review[];

    /**
     * 상품 이미지
     */
    @Column('text', { nullable: true })
    productImages?: string;

    /**
     * 설명 이미지
     */
    @Column('text', { nullable: true })
    descriptionImages?: string;

    /**
     * 재고
     */
    @Column('int', { nullable: false })
    inventory?: number;

    /**
     * 설명
     */
    @Column('text', { nullable: true })
    description: string = '';

    /**
     * 생성일
     */
    @CreateDateColumn()
    createdAt?: Timestamp;
}