import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, Timestamp } from 'typeorm';
import { Product } from './product.entity';
import { User } from './user.entity';

/**
 * @swagger
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: 고유 ID
 *         productId:
 *           type: integer
 *           description: 상품 ID
 *         userId:
 *           type: integer
 *           description: 사용자 ID
 *         rating:
 *           type: integer
 *           description: 별점
 *         reviewImages:
 *           type: string
 *           description: 리뷰 이미지
 *         description:
 *           type: string
 *           description: 리뷰 내용
 *         isDeleted:
 *           type: boolean
 *           description: 삭제 여부
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: 생성일
 *       required:
 *         - id
 *         - productId
 *         - userId
 *         - rating
 *         - isDeleted
 *         - createdAt
 */

@Entity()
export class Review {
    @PrimaryGeneratedColumn()
    id?: number;

    @ManyToOne(() => Product, product => product.id, { nullable: true })
    product?: Product;

    @ManyToOne(() => User, user => user.id, { nullable: true })
    user?: User;

    @Column({ type: 'int' })
    rating?: number;

    @Column({ type: 'text' })
    reviewImages?: string;

    @Column({ type: 'text' })
    description?: string;

    @Column({ type: 'int', default: 0, nullable: true })
    isDeleted?: number;

    @CreateDateColumn()
    createdAt?: Timestamp;
}