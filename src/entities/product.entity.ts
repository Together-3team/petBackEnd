import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Timestamp } from 'typeorm'

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
 *         discountRate:
 *           type: integer
 *           description: 할인율
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