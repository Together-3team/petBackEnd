import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    Timestamp,
    OneToMany,
    OneToOne, JoinColumn,
} from 'typeorm'
import { Product } from './product.entity'

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: 고유 ID
 *         name:
 *           type: string
 *           description: 카테고리명
 *         parentId:
 *           type: integer
 *           description: 부모 카테고리 ID
 *         depth:
 *           type: integer
 *           description: 뎁스
 *         categoryStr:
 *           type: string
 *           description: 카테고리문자열
 *         isDeleted:
 *           type: boolean
 *           description: 삭제 여부
 *         createdAt:
 *           type: string
 *           format: timestamp
 *           description: 생성일
 *       required:
 *         - id
 *         - name
 *         - parentId
 *         - depth
 *         - isDeleted
 *         - createdAt
 */

@Entity()
export class Category {
    /**
     * 고유 ID
     */
    @PrimaryGeneratedColumn()
    id?: number;

    /**
     * 카테고리명
     */
    @Column('varchar', { length: 20, nullable: false })
    name?: string;

    @OneToOne(() => Product, product => product.category, { nullable: true })
    product?: Product;

    /**
     * 부모 카테고리 ID
     */
    @Column('int', { nullable: false })
    parentId?: number;

    /**
     * 뎁스
     */
    @Column('int', { nullable: false })
    depth?: number;

    /**
     * 카테고리문자열
     */
    @Column('varchar', { length: 50, nullable: false })
    categoryStr?: string;

    /**
     * 삭제 여부
     */
    @Column('tinyint', { nullable: false })
    isDeleted?: boolean;

    /**
     * 생성일
     */
    @CreateDateColumn()
    createdAt?: Timestamp;
}