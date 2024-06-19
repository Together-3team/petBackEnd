"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseProductRepository = void 0;
const typeorm_1 = require("../config/typeorm");
const entities_1 = require("../entities");
class PurchaseProductRepository {
    constructor() {
        this.purchaseProductRepository = typeorm_1.AppDataSource.getRepository(entities_1.PurchaseProduct);
        this.updatePurchaseProduct = async (id, purchaseProductData, user) => {
            await this.purchaseProductRepository.findOneByOrFail({ id, user: { id: user.id } });
            await this.purchaseProductRepository.save({ ...purchaseProductData, id });
            return this.purchaseProductRepository.findOneByOrFail({ id });
        };
        this.updatePurchaseProductOrigin = (purchaseProduct) => {
            return this.purchaseProductRepository.save(purchaseProduct);
        };
    }
}
exports.PurchaseProductRepository = PurchaseProductRepository;
