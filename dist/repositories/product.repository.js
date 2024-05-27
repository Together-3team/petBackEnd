"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRepository = void 0;
const entities_1 = require("../entities");
const typeorm_1 = require("../config/typeorm");
class ProductRepository {
    constructor() {
        this.productListRepository = typeorm_1.AppDataSource.getRepository(entities_1.ProductList);
        this.getProductList = () => {
            return this.productListRepository.find();
        };
    }
}
exports.ProductRepository = ProductRepository;
