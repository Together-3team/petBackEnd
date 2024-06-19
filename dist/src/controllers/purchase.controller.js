"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseController = void 0;
const services_1 = require("../services");
class PurchaseController {
    constructor() {
        this.getPurchaseById = async (req, res) => {
            const purchaseId = req.params.id;
            const user = req.user;
            try {
                const purchase = await this.purchaseService.getPurchaseById(purchaseId, user);
                res.json(purchase);
            }
            catch (error) {
                const errorMessage = error.message;
                res.status(500).json({ error: errorMessage });
            }
        };
        this.getPurchasesByUser = async (req, res) => {
            const user = req.user;
            try {
                const purchases = await this.purchaseService.getPurchasesByUser(user);
                res.json(purchases);
            }
            catch (error) {
                const errorMessage = error.message;
                res.status(500).json({ error: errorMessage });
            }
        };
        this.createPurchase = async (req, res) => {
            const purchaseData = req.body;
            const user = req.user;
            try {
                const purchase = await this.purchaseService.createPurchase(purchaseData, user);
                res.json(purchase);
            }
            catch (error) {
                const errorMessage = error.message;
                res.status(500).json({ error: errorMessage });
            }
        };
        this.updatePurchase = async (req, res) => {
            const purchaseData = req.body;
            const purchaseId = req.params.id;
            const user = req.user;
            try {
                const purchase = await this.purchaseService.updatePurchase(purchaseId, purchaseData, user);
                res.json(purchase);
            }
            catch (error) {
                const errorMessage = error.message;
                res.status(500).json({ error: errorMessage });
            }
        };
        this.updatePurchaseProduct = async (req, res) => {
            const purchaseProductData = req.body;
            const purchaseProductId = req.params.id;
            const user = req.user;
            try {
                const purchaseProduct = await this.purchaseService.updatePurchaseProduct(purchaseProductId, purchaseProductData, user);
                res.json(purchaseProduct);
            }
            catch (error) {
                const errorMessage = error.message;
                res.status(500).json({ error: errorMessage });
            }
        };
        this.deletePurchase = async (req, res) => {
            const purchaseId = req.params.id;
            const user = req.user;
            try {
                await this.purchaseService.getPurchaseById(purchaseId, user);
                const result = await this.purchaseService.deletePurchase(purchaseId);
                res.json(result);
            }
            catch (error) {
                const errorMessage = error.message;
                res.status(500).json({ error: errorMessage });
            }
        };
        this.purchaseService = new services_1.PurchaseService();
    }
}
exports.PurchaseController = PurchaseController;
