"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveryController = void 0;
const services_1 = require("../services");
class DeliveryController {
    constructor() {
        this.getDeliveryById = async (req, res) => {
            const deliveryId = req.params.id;
            const user = req.user;
            try {
                const delivery = await this.deliveryService.getDeliveryById(deliveryId);
                res.json(delivery);
            }
            catch (error) {
                const errorMessage = error.message;
                res.status(500).json({ error: errorMessage });
            }
        };
        this.getDeliveriesByUser = async (req, res) => {
            const user = req.user;
            try {
                const deliveries = await this.deliveryService.getDeliveriesByUser(user);
                res.json(deliveries);
            }
            catch (error) {
                const errorMessage = error.message;
                res.status(500).json({ error: errorMessage });
            }
        };
        this.getDefaultDelivery = async (req, res) => {
            const user = req.user;
            try {
                const delivery = await this.deliveryService.getDefaultDelivery(user);
                res.json(delivery);
            }
            catch (error) {
                const errorMessage = error.message;
                res.status(500).json({ error: errorMessage });
            }
        };
        this.createDelivery = async (req, res) => {
            const deliveryData = req.body;
            const user = req.user;
            try {
                const delivery = await this.deliveryService.createDelivery(deliveryData, user);
                res.json(delivery);
            }
            catch (error) {
                const errorMessage = error.message;
                res.status(500).json({ error: errorMessage });
            }
        };
        this.updateDelivery = async (req, res) => {
            const deliveryId = req.params.id;
            const deliveryData = req.body;
            const user = req.user;
            try {
                const delivery = await this.deliveryService.getDeliveryById(deliveryId);
                const updatedDelivery = await this.deliveryService.updateDelivery(deliveryId, deliveryData);
                res.json(updatedDelivery);
            }
            catch (error) {
                const errorMessage = error.message;
                res.status(500).json({ error: errorMessage });
            }
        };
        this.deleteDelivery = async (req, res) => {
            const deliveryId = req.params.id;
            const user = req.user;
            try {
                const delivery = await this.deliveryService.getDeliveryById(deliveryId);
                const result = await this.deliveryService.deleteDelivery(deliveryId);
                res.json(result);
            }
            catch (error) {
                const errorMessage = error.message;
                res.status(500).json({ error: errorMessage });
            }
        };
        this.deliveryService = new services_1.DeliveryService();
    }
}
exports.DeliveryController = DeliveryController;
