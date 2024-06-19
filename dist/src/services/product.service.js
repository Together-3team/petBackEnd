"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const repositories_1 = require("../repositories");
class ProductService {
    constructor() {
        this.getProductById = (productId) => {
            return this.productRepository.getProductById(parseInt(productId));
        };
        this.getProductList = (page, pageSize, preferredPet) => {
            return this.productRepository.getProductList(page, pageSize, preferredPet);
        };
        this.makeOptions = async (options) => {
            return options?.reduce((acc, option) => {
                const { id, optionKey, optionValue } = option;
                if (optionKey !== undefined && id !== undefined && optionValue !== undefined) { // 타입 가드 추가
                    if (!acc[optionKey]) {
                        acc[optionKey] = [];
                    }
                    acc[optionKey].push({ id, optionValue });
                }
                return acc;
            }, {});
        };
        this.makeReviews = async (reviews) => {
            // 리뷰 없을 경우
            if (reviews.length === 0)
                return { rating: 0, reviewCount: 0 };
            // 리뷰 평점
            const totalRating = reviews.reduce((sum, review) => {
                if (review.rating !== undefined) {
                    return sum + review.rating;
                }
                else {
                    return sum;
                }
            }, 0);
            // 리뷰 총 개수
            const reviewCount = reviews.length;
            // 리뷰의 평균 평점 계산
            const rating = totalRating / reviewCount;
            return { rating, reviewCount };
        };
        this.getProductDetail = async (productId) => {
            const result = await this.productRepository.getProductDetail(productId);
            let makeOptions;
            let makeReviews;
            if (result?.product?.options) {
                makeOptions = await this.makeOptions(result?.product?.options);
            }
            if (result?.productDetail?.reviews) {
                makeReviews = await this.makeReviews(result?.productDetail.reviews);
            }
            // 필요한 데이터만 추출
            return {
                productImages: result?.productDetail?.productImages,
                descriptionImages: result?.productDetail?.descriptionImages,
                thumbNailImage: result?.productDetail?.productId?.thumbNailImage,
                title: result?.productDetail?.productId?.title,
                originalPrice: result?.productDetail?.productId?.originalPrice,
                price: result?.productDetail?.productId?.price,
                reviewRating: makeReviews?.rating,
                reviewCount: makeReviews?.reviewCount,
                productId: result?.productDetail?.productId?.id,
                category: result?.product?.category?.categoryStr,
                options: makeOptions,
                optionCombinations: result?.product?.optionCombinations?.map(({ createdAt, ...rest }) => rest),
            };
        };
        this.productRepository = new repositories_1.ProductRepository();
    }
}
exports.ProductService = ProductService;
