"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const repositories_1 = require("../repositories");
class ProductService {
    constructor() {
        this.getProductList = () => {
            return this.productRepository.getProductList();
        };
        this.productRepository = new repositories_1.ProductRepository();
    }
}
exports.ProductService = ProductService;
