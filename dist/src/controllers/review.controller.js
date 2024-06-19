"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewController = void 0;
const services_1 = require("../services");
class ReviewController {
    constructor() {
        this.removeReview = async (req, res) => {
            try {
                const user = req.user;
                user.id = 1;
                const reviewId = parseInt(req.params.rid, 10);
                const result = await this.reviewService.removeReview(user.id, reviewId);
                if ('error' in result) {
                    res.status(403).json({ error: result.error });
                }
                else {
                    res.status(200).json({ result: result.result });
                }
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        };
        /**
         * 리뷰 생성 메서드
         * @param req
         * @param res
         */
        this.createReview = async (req, res) => {
            try {
                const createReviewDto = req.body;
                const user = req.user;
                const createReview = await this.reviewService.createReview(user.id, createReviewDto);
                res.status(200).json({ "result": "Success" });
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({ error: error.message });
                }
                else {
                    res.status(500).json({ error: 'Internal Server Error' });
                }
            }
        };
        this.getReviewable = async (req, res) => {
            try {
                const user = req.user;
                const page = parseInt(req.query.page, 10) || 1;
                const pageSize = parseInt(req.query.pageSize, 10) || 2;
                const reviewAbleProduct = await this.reviewService.getReviewable(user.id, page, pageSize);
                res.status(200).json(reviewAbleProduct);
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({ error: error.message });
                }
                else {
                    res.status(500).json({ error: 'Internal Server Error' });
                }
            }
        };
        this.getWroteReviews = async (req, res) => {
            try {
                const user = req.user;
                const page = parseInt(req.query.page, 10) || 1;
                const pageSize = parseInt(req.query.pageSize, 10) || 2;
                const reviewWroteProduct = await this.reviewService.getWroteReviews(user.id, page, pageSize);
                res.status(200).json(reviewWroteProduct);
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({ error: error.message });
                }
                else {
                    res.status(500).json({ error: 'Internal Server Error' });
                }
            }
        };
        this.reviewService = new services_1.ReviewService();
    }
}
exports.ReviewController = ReviewController;
