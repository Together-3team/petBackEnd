"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const repositories_1 = require("../repositories");
const axios_1 = __importDefault(require("axios"));
const entities_1 = require("../entities");
class PaymentService {
    constructor() {
        this.changedStatus = async (orderId) => {
            try {
                return await this.paymentRepository.updatePurchase(orderId, 1);
            }
            catch (error) {
                console.error(error);
                throw new Error('changedStatus error');
            }
        };
        this.createGroupBuying = async (paymentComplete) => {
            try {
                const purchaseProducts = paymentComplete.purchaseProducts;
                if (!purchaseProducts || purchaseProducts.length === 0) {
                    new Error('No selected products found');
                }
                for (const purchaseProduct of purchaseProducts) {
                    if (purchaseProduct.groupBuying)
                        return;
                    const productId = Number(purchaseProduct.productId);
                    const product = await this.productRepository.getProductById(productId);
                    const newGroupBuying = new entities_1.GroupBuying();
                    newGroupBuying.status = 0;
                    newGroupBuying.product = product;
                    newGroupBuying.purchaseProducts = [purchaseProduct];
                    await this.paymentRepository.createGroupBuying(newGroupBuying);
                    purchaseProduct.groupBuying = newGroupBuying;
                    purchaseProduct.status = 2;
                    await this.purchaseProductRepository.updatePurchaseProductOrigin(purchaseProduct);
                }
            }
            catch (error) {
                throw new Error('createGroupBuying Error');
            }
        };
        this.toSelectedProductDTO = async (selectedProduct) => {
            return {
                id: selectedProduct.id,
                quantity: selectedProduct.quantity,
                status: selectedProduct.status,
                createdAt: selectedProduct.createdAt,
                user: selectedProduct.user,
                optionCombination: {
                    id: selectedProduct.optionCombination.id,
                    optionCombination: selectedProduct.optionCombination.optionCombination,
                    combinationPrice: selectedProduct.optionCombination.combinationPrice,
                    combinationName: selectedProduct.optionCombination.combinationName,
                    createdAt: selectedProduct.optionCombination.createdAt,
                    amount: selectedProduct.optionCombination.amount,
                    product: selectedProduct.optionCombination.product,
                },
            };
        };
        this.toPurchaseProduct = async (product, user) => {
            return {
                createdAt: new Date(), // Set to current date or any valid Date object
                combinationPrice: product.optionCombination?.combinationPrice ?? 0,
                deliveryCompany: '',
                combinationName: product.optionCombination?.combinationName ?? '',
                originalPrice: product.optionCombination?.product?.originalPrice ?? 0,
                price: product.optionCombination?.product?.price ?? 0,
                quantity: product.quantity,
                status: 0,
                thumbNailImage: product.optionCombination?.product?.thumbNailImage ?? '',
                title: product.optionCombination?.product?.title ?? '',
                trackingNumber: '',
                user: user,
                productId: product.optionCombination?.product?.id ?? '',
            }; // Explicitly type-cast
        };
        this.setGroupBuying = async (purchaseProduct, groupBuyingId) => {
            const groupBuyingItem = await this.groupBuyingRepository.findById(groupBuyingId);
            if (!groupBuyingItem) {
                throw new Error('Group buy not found');
            }
            if (!groupBuyingItem.purchaseProducts) {
                groupBuyingItem.purchaseProducts = [];
            }
            groupBuyingItem.purchaseProducts.push(purchaseProduct);
            groupBuyingItem.status = 1;
            await this.groupBuyingRepository.save(groupBuyingItem);
        };
        this.createPurchase = async (paymentRequestDto, user) => {
            const purchaseProducts = [];
            const groupBuyingId = paymentRequestDto?.groupBuyingId;
            const delivery = await this.deliveryRepository.findDeliveryById(paymentRequestDto?.deliveryId);
            const selectedProductList = await Promise.all((paymentRequestDto?.selectedProductIds?.split(',') ?? []).map(async (productId) => {
                const selectedProduct = await this.selectedPaymentRepository.findSelectedProductById(Number(productId));
                return this.toSelectedProductDTO(selectedProduct);
            }));
            for (const product of selectedProductList) {
                const newPurchaseProduct = await this.toPurchaseProduct(product, user);
                const purchaseProduct = await this.paymentRepository.createPurchaseProduct(newPurchaseProduct);
                if (groupBuyingId)
                    await this.setGroupBuying(purchaseProduct, groupBuyingId);
                purchaseProducts.push(purchaseProduct);
            }
            const newPurchase = {
                purchaseProducts: purchaseProducts,
                deliveryName: delivery.name,
                recipient: delivery.recipient,
                recipientPhoneNumber: delivery.recipientPhoneNumber,
                zipCode: delivery.zipCode,
                address: delivery.address,
                detailedAddress: delivery.detailedAddress,
                user,
                orderId: paymentRequestDto.orderId,
                paymentKey: paymentRequestDto.paymentKey,
                createdAt: new Date(),
                id: 0,
                paymentStatus: 0,
                deliveryMessage: paymentRequestDto.deliveryMessage
            };
            return this.paymentRepository.create(newPurchase)
        };
        this.paymentsConfirm = async (amount, orderId, paymentKey) => {
            const paymentSecretKey = process.env.PAYMENT_SECRET_KEY;
            if (!paymentSecretKey) {
                throw new Error('PAYMENT_SECRET_KEY is not defined');
            }
            try {
                return await axios_1.default.post('https://api.tosspayments.com/v1/payments/confirm', {
                    amount,
                    orderId,
                    paymentKey,
                }, {
                    headers: {
                        Authorization: `Basic ${Buffer.from(`${paymentSecretKey}:`).toString('base64')}`,
                        'Content-Type': 'application/json'
                    }
                });
            }
            catch (error) {
                console.log(error);
                throw new Error(error);
            }
        };
        this.selectedPaymentRepository = new repositories_1.SelectedProductRepository();
        this.paymentRepository = new repositories_1.PaymentRepository();
        this.deliveryRepository = new repositories_1.DeliveryRepository();
        this.userRepository = new repositories_1.UserRepository();
        this.purchaseProductRepository = new repositories_1.PurchaseProductRepository();
        this.productRepository = new repositories_1.ProductRepository();
        this.groupBuyingRepository = new repositories_1.GroupBuyingRepository();
    }
}
exports.PaymentService = PaymentService;
