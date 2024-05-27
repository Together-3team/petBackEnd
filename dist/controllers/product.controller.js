"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
class ProductController {
    constructor(productService) {
        this.getProductList = async (req, res) => {
            try {
                const productList = await this.productService.getProductList();
                res.json(productList); // 데이터를 바로 응답으로 보냄
            }
            catch (error) {
                const errorMessage = error.message;
                res.status(500).json({ error: errorMessage });
            }
        };
        this.productService = productService;
    }
}
exports.ProductController = ProductController;
