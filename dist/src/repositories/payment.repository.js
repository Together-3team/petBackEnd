"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentRepository = void 0;
const entities_1 = require("../entities");
const typeorm_1 = require("../config/typeorm");
const entities_2 = require("../entities");
const entities_3 = require("../entities");
class PaymentRepository {
    constructor() {
        this.reviewRepository = typeorm_1.AppDataSource.getRepository(entities_1.Review);
        this.productRepository = typeorm_1.AppDataSource.getRepository(entities_1.Product);
        this.userRepository = typeorm_1.AppDataSource.getRepository(entities_1.User);
        this.purchaseRepository = typeorm_1.AppDataSource.getRepository(entities_1.Purchase);
        this.groupBuyingRepository = typeorm_1.AppDataSource.getRepository(entities_2.GroupBuying);
        this.purchaseProductRepository = typeorm_1.AppDataSource.getRepository(entities_3.PurchaseProduct);
        this.createGroupBuying = async (newGroupBuying) => {
            try {
                return await this.groupBuyingRepository.save(newGroupBuying);
            }
            catch (error) {
                console.error(error);
                throw new Error('');
            }
        };
        this.updatePurchase = async (orderId, status) => {
            try {
                const purchase = await this.purchaseRepository.findOne({ where: { orderId: orderId }, relations: ['purchaseProducts', 'purchaseProducts.groupBuying'] });
                console.log(purchase);
                if (!purchase) {
                    throw new Error(`Purchase with orderId ${orderId} not found`);
                }
                purchase.paymentStatus = status;
                return await this.purchaseRepository.save(purchase);
            }
            catch (error) {
                console.log(error);
                throw new Error('');
            }
        };
        this.create = async (newPurchase) => {
            try {
                return await this.purchaseRepository.save(newPurchase);
            }
            catch (error) {
                console.log(error);
                throw new Error('Failed to create Purchase');
            }
        };
        this.createPurchaseProduct = async (newPurchaseProduct) => {
            try {
                console.log('newPurchaseProduct :::::: ', newPurchaseProduct);
                return await this.purchaseProductRepository.save(newPurchaseProduct);
            }
            catch (error) {
                console.log(error);
                throw new Error('Failed to create Purchase');
            }
        };
    }
}
exports.PaymentRepository = PaymentRepository;
