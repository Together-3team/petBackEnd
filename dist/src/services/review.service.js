"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewService = void 0;
const repositories_1 = require("../repositories");
class ReviewService {
    constructor() {
        this.getReviewable = (userId, page, pageSize) => {
            return this.reviewRepository.getReviewable(userId, page, pageSize);
        };
        this.createReview = (userId, reviewInfo) => {
            return this.reviewRepository.createReview(userId, reviewInfo);
        };
        this.getWroteReviews = (userId, page, pageSize) => {
            return this.reviewRepository.getWroteReviews(userId, page, pageSize);
        };
        this.reviewRepository = new repositories_1.ReviewRepository();
    }
    async removeReview(userId, reviewId) {
        const review = await this.reviewRepository.findReviewById(reviewId);
        if (!review) {
            return { error: "Review not found" };
        }
        // 사용자 권한 확인: 자신의 리뷰만 삭제 가능
        if (review.user?.id !== userId) {
            return { error: "Unauthorized" };
        }
        await this.reviewRepository.softDelete(reviewId);
        return { result: "Success" };
    }
}
exports.ReviewService = ReviewService;
