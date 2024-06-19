"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseService = void 0;
const dtos_1 = require("../dtos");
const repositories_1 = require("../repositories");
const class_transformer_1 = require("class-transformer");
class PurchaseService {
    constructor() {
        this.entityToResponseDto = (purchase) => {
            const purchaseProducts = purchase.purchaseProducts.map(product => (0, class_transformer_1.plainToInstance)(dtos_1.PurchaseProductResponseDto, product));
            return (0, class_transformer_1.plainToInstance)(dtos_1.PurchaseResponseDto, { ...purchase, purchaseProducts });
        };
        this.getPurchaseById = async (purchaseId, user) => {
            const purchase = await this.purchaseRepository.findPurchaseById(parseInt(purchaseId), user);
            return this.entityToResponseDto(purchase);
        };
        this.getPurchasesByUser = async (user) => {
            const purchases = await this.purchaseRepository.findPurchasesByUser(user);
            return purchases.map((purchase) => this.entityToResponseDto(purchase));
        };
        this.createPurchase = async (purchaseData, user) => {
            const purchase = await this.purchaseRepository.createPurchase(purchaseData, user);
            return this.entityToResponseDto(purchase);
        };
        this.updatePurchase = async (purchaseId, purchaseData, user) => {
            const purchase = await this.purchaseRepository.updatePurchase(parseInt(purchaseId), purchaseData, user);
            return (0, class_transformer_1.plainToInstance)(dtos_1.PurchaseResponseDto, purchase);
        };
        this.updatePurchaseProduct = async (purchaseProductId, purchaseProductData, user) => {
            const purchaseProduct = await this.purchaseProductRepository.updatePurchaseProduct(parseInt(purchaseProductId), purchaseProductData, user);
            return (0, class_transformer_1.plainToInstance)(dtos_1.PurchaseProductResponseDto, purchaseProduct);
        };
        this.deletePurchase = (purchaseId) => {
            return this.purchaseRepository.deletePurchase(parseInt(purchaseId));
        };
        this.purchaseRepository = new repositories_1.PurchaseRepository();
        this.purchaseProductRepository = new repositories_1.PurchaseProductRepository();
    }
}
exports.PurchaseService = PurchaseService;
