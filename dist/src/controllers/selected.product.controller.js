"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectedProductController = void 0;
const services_1 = require("../services");
class SelectedProductController {
    constructor() {
        this.getSelectedProducts = async (req, res) => {
            const user = req.user;
            try {
                const selectedProducts = await this.selectedProductService.getSelectedProductByUser(user);
                res.json(selectedProducts);
            }
            catch (error) {
                const errorMessage = error.message;
                res.status(500).json({ error: errorMessage });
            }
        };
        this.getCarts = async (req, res) => {
            const user = req.user;
            try {
                const selectedProducts = await this.selectedProductService.getCarts(user);
                res.json(selectedProducts);
            }
            catch (error) {
                const errorMessage = error.message;
                res.status(500).json({ error: errorMessage });
            }
        };
        this.getOrders = async (req, res) => {
            const user = req.user;
            try {
                const selectedProducts = await this.selectedProductService.getOrders(user);
                res.json(selectedProducts);
            }
            catch (error) {
                const errorMessage = error.message;
                res.status(500).json({ error: errorMessage });
            }
        };
        // public addToCart = async (req: Request, res: Response): Promise<void> => {
        //   const rawData: CreateSelectedProductDto = req.body
        //   const user = req.user as User
        //   try {
        //     const selectedProduct = await this.selectedProductService.addToCart(rawData, user)
        //     res.json(selectedProduct)
        //   } catch (error) {
        //     const errorMessage = (error as Error).message
        //     res.status(500).json({ error: errorMessage })
        //   }
        // }
        this.addToOrder = async (req, res) => {
            const rawData = req.body;
            const user = req.user;
            try {
                const selectedProduct = await this.selectedProductService.addToOrder(rawData, user);
                res.json(selectedProduct);
            }
            catch (error) {
                const errorMessage = error.message;
                res.status(500).json({ error: errorMessage });
            }
        };
        this.orderToCart = async (req, res) => {
            const user = req.user;
            try {
                const selectedProduct = await this.selectedProductService.updateStatus(0, 1, user);
                res.json(selectedProduct);
            }
            catch (error) {
                const errorMessage = error.message;
                res.status(500).json({ error: errorMessage });
            }
        };
        this.updateSelectedProduct = async (req, res) => {
            const selectedProductId = req.params.id;
            const selectedProductData = req.body;
            const user = req.user;
            try {
                const selectedProduct = await this.selectedProductService.getSelectedProductById(selectedProductId);
                if (selectedProduct.user.id !== user.id)
                    res.status(401).json({ message: "상속 관계에 있지 않습니다" });
                else {
                    const result = await this.selectedProductService.updateSelectedProduct(selectedProductId, selectedProductData);
                    res.json(result);
                }
            }
            catch (error) {
                const errorMessage = error.message;
                res.status(500).json({ error: errorMessage });
            }
        };
        this.deleteSelectedProduct = async (req, res) => {
            const selectedProductId = req.params.id;
            const user = req.user;
            try {
                const selectedProduct = await this.selectedProductService.getSelectedProductById(selectedProductId);
                if (selectedProduct.user.id !== user.id)
                    res.status(401).json({ message: "상속 관계에 있지 않습니다" });
                else {
                    const result = await this.selectedProductService.deleteSelectedProduct(selectedProductId);
                    res.json(result);
                }
            }
            catch (error) {
                const errorMessage = error.message;
                res.status(500).json({ error: errorMessage });
            }
        };
        this.deleteCarts = async (req, res) => {
            const user = req.user;
            try {
                const result = await this.selectedProductService.deleteByStatus('1', user);
                res.json(result);
            }
            catch (error) {
                const errorMessage = error.message;
                res.status(500).json({ error: errorMessage });
            }
        };
        this.deleteOrders = async (req, res) => {
            const user = req.user;
            try {
                const result = await this.selectedProductService.deleteByStatus('0', user);
                res.json(result);
            }
            catch (error) {
                const errorMessage = error.message;
                res.status(500).json({ error: errorMessage });
            }
        };
        this.selectedProductService = new services_1.SelectedProductService();
    }
}
exports.SelectedProductController = SelectedProductController;
