"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseRepository = void 0;
const entities_1 = require("../entities");
const typeorm_1 = require("../config/typeorm");
class PurchaseRepository {
    constructor() {
        this.purchaseRepo = typeorm_1.AppDataSource.getRepository(entities_1.Purchase);
        this.purchaseProductRepo = typeorm_1.AppDataSource.getRepository(entities_1.PurchaseProduct);
        this.selectedProductRepo = typeorm_1.AppDataSource.getRepository(entities_1.SelectedProduct);
        this.deliveryRepo = typeorm_1.AppDataSource.getRepository(entities_1.Delivery);
        this.findPurchaseById = async (id, user) => {
            return this.purchaseRepo.findOneByOrFail({ id, user: { id: user.id } });
        };
        this.findPurchasesByUser = async (user) => {
            return this.purchaseRepo.findBy({ user: { id: user.id } });
        };
        this.createPurchase = async (purchaseData, user) => {
            // @ts-ignore
            const delivery = await this.deliveryRepo.findOneByOrFail({ id: purchaseData.deliveryId });
            const newPurchase = this.purchaseRepo.create({
                user,
                deliveryName: delivery.name,
                recipient: delivery.recipient,
                recipientPhoneNumber: delivery.recipientPhoneNumber,
                zipCode: delivery.zipCode,
                address: delivery.address,
                detailedAddress: delivery.detailedAddress,
                orderId: purchaseData.orderId,
                paymentKey: purchaseData.paymentKey,
                deliveryMessage: purchaseData.deliveryMessage
            });
            const result = await this.purchaseRepo.insert(newPurchase);
            const purchase = await this.purchaseRepo.findOneByOrFail({ id: result.identifiers[0].id });
            for (const id of purchaseData.selectedProductIds) {
                const selectedProduct = await this.selectedProductRepo.findOneOrFail({
                    relations: ['optionCombination', 'optionCombination.product'],
                    where: { id }
                });
                console.log(id, selectedProduct);
                const newPurchaseProduct = this.purchaseProductRepo.create({
                    purchase,
                    user,
                    title: selectedProduct.optionCombination.product.title,
                    combinationName: selectedProduct.optionCombination.combinationName,
                    quantity: selectedProduct.quantity,
                    originalPrice: selectedProduct.optionCombination.product.originalPrice,
                    price: selectedProduct.optionCombination.product.price,
                    combinationPrice: selectedProduct.optionCombination.combinationPrice,
                    thumbNailImage: selectedProduct.optionCombination.product.thumbNailImage,
                    productId: selectedProduct.optionCombination.product.id
                });
                await this.purchaseProductRepo.insert(newPurchaseProduct);
                await this.selectedProductRepo.delete({ id });
            }
            return this.purchaseRepo.findOneByOrFail({ id: result.identifiers[0].id });
        };
        this.updatePurchase = async (id, purchaseData, user) => {
            await this.purchaseRepo.findOneByOrFail({ id, user: { id: user.id } });
            await this.purchaseRepo.save({ ...purchaseData, id });
            return this.purchaseRepo.findOneByOrFail({ id });
        };
        this.deletePurchase = (id) => {
            return this.purchaseRepo.delete({ id });
        };
    }
}
exports.PurchaseRepository = PurchaseRepository;
