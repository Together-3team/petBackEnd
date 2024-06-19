"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRepository = void 0;
const entities_1 = require("../entities");
const typeorm_1 = require("../config/typeorm");
const review_repository_1 = require("./review.repository");
class ProductRepository {
    constructor() {
        this.productListRepository = typeorm_1.AppDataSource.getRepository(entities_1.Product);
        this.productDetailRepository = typeorm_1.AppDataSource.getRepository(entities_1.ProductDetail);
        this.reviewRepositoryInstance = new review_repository_1.ReviewRepository();
        this.getProductById = (id) => {
            return this.productListRepository.findOneByOrFail({ id });
        };
        // 페이지 번호와 페이지 크기를 사용하여 상품 목록을 가져오는 메서드
        this.getProductList = (page, pageSize, preferredPet) => {
            const options = {
                skip: (page - 1) * pageSize, // 건너뛸 레코드 수 계산
                take: pageSize, // 가져올 레코드 수 설정
                where: preferredPet === 0 ? {} : preferredPet === 1 ? [{ petType: 0 }, { petType: 1 }] : [{ petType: 0 }, { petType: 2 }]
            };
            // 페이지네이션을 적용하여 상품 목록 조회
            return this.productListRepository.find(options);
        };
        this.getProductDetail = async (productId) => {
            const productDetail = await this.productDetailRepository.findOne({
                where: { id: productId },
                relations: ['productId']
            });
            const product = await this.productListRepository.findOne({
                where: { id: productId },
                relations: ['options', 'optionCombinations', 'category']
            });
            if (!productDetail || !product) {
                return null;
            }
            // productId에 해당하는 모든 Review를 가져옴
            productDetail.reviews = await this.reviewRepositoryInstance.getReviewsByProductId(productId);
            return { productDetail, product } || null;
        };
    }
}
exports.ProductRepository = ProductRepository;
