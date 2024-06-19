"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewRepository = void 0;
const entities_1 = require("../entities");
const typeorm_1 = require("../config/typeorm");
class ReviewRepository {
    constructor() {
        this.reviewRepository = typeorm_1.AppDataSource.getRepository(entities_1.Review);
        this.productRepository = typeorm_1.AppDataSource.getRepository(entities_1.Product);
        this.userRepository = typeorm_1.AppDataSource.getRepository(entities_1.User);
        this.purchaseProductRepository = typeorm_1.AppDataSource.getRepository(entities_1.PurchaseProduct);
        this.getWroteReviews = async (userId, page, pageSize) => {
            try {
                const skip = (page - 1) * pageSize;
                return await this.purchaseProductRepository.createQueryBuilder('purchaseProduct')
                    .leftJoinAndSelect('purchaseProduct.review', 'review')
                    .where('purchaseProduct.userId = :userId', { userId })
                    .andWhere('review.isDeleted = :isDeleted', { isDeleted: 0 })
                    .skip(skip)
                    .take(pageSize)
                    .getMany();
            }
            catch (error) {
                console.log(error);
                throw new Error('getReviewable ERROR');
            }
        };
        this.getReviewable = async (userId, page, pageSize) => {
            try {
                const skip = (page - 1) * pageSize;
                return await this.purchaseProductRepository.createQueryBuilder('purchaseProduct')
                    .leftJoinAndSelect('purchaseProduct.review', 'review')
                    .where('purchaseProduct.userId = :userId', { userId })
                    .andWhere('purchaseProduct.status = :status', { status: 5 })
                    .andWhere('review.id IS NULL')
                    .skip(skip)
                    .take(pageSize)
                    .getMany();
            }
            catch (error) {
                console.log(error);
                throw new Error('getReviewable ERROR');
            }
        };
        this.createReview = async (userId, reviewInfo) => {
            const { productId, purchaseProductId, ...rest } = reviewInfo;
            if (purchaseProductId === undefined) {
                throw new Error(`purChaseProduct ID is undefined`);
            }
            if (productId === undefined) {
                throw new Error(`Product ID is undefined`);
            }
            if (userId === undefined) {
                throw new Error(`User ID is undefined`);
            }
            const purchaseProduct = await this.purchaseProductRepository.findOne({ where: { id: purchaseProductId } });
            if (!purchaseProduct) {
                throw new Error(`Product with ID ${purchaseProductId} not found`);
            }
            const product = await this.productRepository.findOne({ where: { id: productId } });
            if (!product) {
                throw new Error(`Product with ID ${productId} not found`);
            }
            const user = await this.userRepository.findOne({ where: { id: userId } });
            if (!user) {
                throw new Error(`User with ID ${userId} not found`);
            }
            const review = this.reviewRepository.create({ purchaseProduct, product, user, ...rest });
            return await this.reviewRepository.save(review);
        };
        // productId에 해당하는 모든 Review를 가져오는 메서드
        this.getReviewsByProductId = async (productId) => {
            return await this.reviewRepository.find({
                where: { product: { id: productId } },
            });
        };
    }
    async findReviewById(reviewId) {
        return this.reviewRepository
            .createQueryBuilder('review')
            .leftJoinAndSelect('review.user', 'user')
            .where('review.id = :id', { id: reviewId })
            .getOne();
    }
    async softDelete(reviewId) {
        await this.reviewRepository.update(reviewId, { isDeleted: 1 });
    }
}
exports.ReviewRepository = ReviewRepository;
