"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveryRepository = void 0;
const entities_1 = require("../entities");
const typeorm_1 = require("../config/typeorm");
class DeliveryRepository {
    constructor() {
        this.deliveryRepo = typeorm_1.AppDataSource.getRepository(entities_1.Delivery);
        this.removeDefault = async (user) => {
            const defaultDelivery = await this.deliveryRepo.findOneBy({ user: { id: user.id }, isDefault: true });
            if (defaultDelivery)
                await this.deliveryRepo.save({ ...defaultDelivery, isDefault: false });
        };
        this.findDeliveryById = async (id) => {
            if (id === undefined) {
                throw new Error('Delivery ID is undefined');
            }
            return await this.deliveryRepo.findOneByOrFail({ id });
        };
        this.findDeliveriesByUser = (user) => {
            return this.deliveryRepo.findBy({ user: { id: user.id } });
        };
        this.findDefaultDelivery = (user) => {
            return this.deliveryRepo.findOneBy({ user: { id: user.id }, isDefault: true });
        };
        this.createDelivery = async (deliveryData, user) => {
            const newDelivery = this.deliveryRepo.create({ ...deliveryData, user });
            if (newDelivery.isDefault)
                await this.removeDefault(user);
            const result = await this.deliveryRepo.insert(newDelivery);
            return this.deliveryRepo.findOneByOrFail({ id: result.identifiers[0].id });
        };
        this.updateDelivery = async (id, deliveryData) => {
            if (deliveryData.isDefault) {
                const delivery = await this.deliveryRepo.findOneByOrFail({ id });
                await this.removeDefault(delivery.user);
            }
            return this.deliveryRepo.save({ ...deliveryData, id });
        };
        this.deleteDelivery = (id) => {
            return this.deliveryRepo.delete({ id });
        };
    }
}
exports.DeliveryRepository = DeliveryRepository;
