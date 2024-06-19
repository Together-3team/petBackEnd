"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveryService = void 0;
const repositories_1 = require("../repositories");
const dtos_1 = require("../dtos");
const class_transformer_1 = require("class-transformer");
class DeliveryService {
    constructor() {
        this.getDeliveryById = async (deliveryId) => {
            const delivery = this.deliveryRepository.findDeliveryById(parseInt(deliveryId));
            return (0, class_transformer_1.plainToInstance)(dtos_1.DeliveryResponseDto, delivery);
        };
        this.getDeliveriesByUser = async (user) => {
            const deliveries = await this.deliveryRepository.findDeliveriesByUser(user);
            return deliveries.map(delivery => (0, class_transformer_1.plainToInstance)(dtos_1.DeliveryResponseDto, delivery));
        };
        this.getDefaultDelivery = async (user) => {
            const delivery = await this.deliveryRepository.findDefaultDelivery(user);
            return delivery ? (0, class_transformer_1.plainToInstance)(dtos_1.DeliveryResponseDto, delivery) : null;
        };
        this.createDelivery = async (deliveryData, user) => {
            const delivery = this.deliveryRepository.createDelivery(deliveryData, user);
            return (0, class_transformer_1.plainToInstance)(dtos_1.DeliveryResponseDto, delivery);
        };
        this.updateDelivery = async (deliveryId, deliveryData) => {
            const delivery = this.deliveryRepository.updateDelivery(parseInt(deliveryId), deliveryData);
            return (0, class_transformer_1.plainToInstance)(dtos_1.DeliveryResponseDto, delivery);
        };
        this.deleteDelivery = async (deliveryId) => {
            return this.deliveryRepository.deleteDelivery(parseInt(deliveryId));
        };
        this.deliveryRepository = new repositories_1.DeliveryRepository();
    }
}
exports.DeliveryService = DeliveryService;
