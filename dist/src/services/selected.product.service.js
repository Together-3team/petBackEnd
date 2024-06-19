"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectedProductService = void 0;
const dtos_1 = require("../dtos");
const repositories_1 = require("../repositories");
const class_transformer_1 = require("class-transformer");
class SelectedProductService {
    constructor() {
        this.entityToResponseDto = (selectProduct) => {
            const productResponse = (0, class_transformer_1.plainToInstance)(dtos_1.ProductResponseDto, selectProduct.optionCombination.product);
            const optionCombinationResponse = (0, class_transformer_1.plainToInstance)(dtos_1.OptionCombinationResponseDto, { ...selectProduct.optionCombination, product: productResponse });
            return (0, class_transformer_1.plainToInstance)(dtos_1.SelectedProductResponseDto, { ...selectProduct, optionCombination: optionCombinationResponse });
        };
        this.getSelectedProductByUser = async (user) => {
            return this.selectedProductRepository.findSelectedProductByUser(user);
        };
        this.getSelectedProductById = (selectedProductId) => {
            return this.selectedProductRepository.findSelectedProductById(parseInt(selectedProductId));
        };
        this.getCarts = async (user) => {
            const carts = await this.selectedProductRepository.findSelectedProductsByUserAndStatus(1, user);
            return carts.map(cart => this.entityToResponseDto(cart));
        };
        this.getOrders = async (user) => {
            const orders = await this.selectedProductRepository.findSelectedProductsByUserAndStatus(0, user);
            return orders.map(order => this.entityToResponseDto(order));
        };
        this.addToOrder = async (selectedProductData, user) => {
            const selectedProduct = await this.selectedProductRepository.findSelectedProductByOptionCombinationIdAndStatus(selectedProductData.optionCombinationId, 0, user);
            if (selectedProduct)
                return this.entityToResponseDto(await this.selectedProductRepository.updateSelectedProduct(selectedProduct.id, { ...selectedProduct, quantity: selectedProduct.quantity + selectedProductData.quantity }));
            return this.entityToResponseDto(await this.selectedProductRepository.createSelectedProduct(selectedProductData, user, 0));
        };
        this.updateSelectedProduct = (selectedProductId, SelectedProductData) => {
            return this.selectedProductRepository.updateSelectedProduct(parseInt(selectedProductId), SelectedProductData);
        };
        this.deleteSelectedProduct = (SelectedProductId) => {
            return this.selectedProductRepository.deleteSelectedProduct(parseInt(SelectedProductId));
        };
        this.deleteByStatus = (status, user) => {
            return this.selectedProductRepository.deleteByStatus(parseInt(status), user);
        };
        this.updateStatus = async (fromStatus, toStatus, user) => {
            const selectedProducts = await this.selectedProductRepository.updateStatus(fromStatus, toStatus, user);
            return selectedProducts.map(selectedProduct => this.entityToResponseDto(selectedProduct));
        };
        this.selectedProductRepository = new repositories_1.SelectedProductRepository();
    }
}
exports.SelectedProductService = SelectedProductService;
