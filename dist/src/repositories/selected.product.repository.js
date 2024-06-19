"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectedProductRepository = void 0;
const entities_1 = require("../entities");
const typeorm_1 = require("../config/typeorm");
class SelectedProductRepository {
    constructor() {
        this.selectedProductRepo = typeorm_1.AppDataSource.getRepository(entities_1.SelectedProduct);
        this.optionCombinationRepo = typeorm_1.AppDataSource.getRepository(entities_1.OptionCombination);
        this.findSelectedProductByUser = (user) => {
            return this.selectedProductRepo.find({
                relations: ['optionCombination', 'optionCombination.product'],
                where: {
                    user: { id: user.id }
                }
            });
        };
        this.findSelectedProductById = async (id) => {
            return await this.selectedProductRepo.findOneOrFail({
                where: { id },
                relations: ['user', 'optionCombination', 'optionCombination.product']
            });
        };
        this.findSelectedProductByOptionCombinationIdAndStatus = (optionCombinationId, status, user) => {
            return this.selectedProductRepo.findOne({
                relations: ['optionCombination', 'optionCombination.product'],
                where: {
                    optionCombination: { id: optionCombinationId }, status, user: { id: user.id }
                }
            });
        };
        this.findSelectedProductsByUserAndStatus = (status, user) => {
            return this.selectedProductRepo.find({
                relations: ['optionCombination', 'optionCombination.product'],
                where: {
                    status, user: { id: user.id }
                }
            });
        };
        this.createSelectedProduct = async (selectedProductData, user, status) => {
            const optionCombination = await this.optionCombinationRepo.findOneOrFail({ where: { id: selectedProductData.optionCombinationId } });
            const newSelectedProduct = this.selectedProductRepo.create({ optionCombination, user, status, quantity: selectedProductData.quantity });
            const result = await this.selectedProductRepo.insert(newSelectedProduct);
            return this.selectedProductRepo.findOneOrFail({
                relations: ['optionCombination', 'optionCombination.product'],
                where: {
                    id: result.identifiers[0].id
                }
            });
        };
        this.updateSelectedProduct = (id, selectedProductData) => {
            return this.selectedProductRepo.save({ ...selectedProductData, id });
        };
        this.updateSelectedProductOrigin = (selectedProductData) => {
            return this.selectedProductRepo.save(selectedProductData);
        };
        this.updateStatus = async (fromStatus, toStatus, user) => {
            const selectedProducts = await this.selectedProductRepo.findBy({ user: { id: user.id }, status: fromStatus });
            var result = [];
            for (const x of selectedProducts) {
                const y = await this.findSelectedProductByOptionCombinationIdAndStatus(x.optionCombination.id, toStatus, x.user);
                if (y) {
                    result.push(await this.selectedProductRepo.save({ ...y, quantity: y.quantity + x.quantity }));
                    await this.selectedProductRepo.delete({ id: x.id });
                }
                else
                    result.push(await this.selectedProductRepo.save({ ...x, status: toStatus }));
            }
            return result;
        };
        this.deleteSelectedProduct = (id) => {
            return this.selectedProductRepo.delete({ id });
        };
        this.deleteByStatus = (status, user) => {
            return this.selectedProductRepo.delete({ status, user: { id: user.id } });
        };
    }
}
exports.SelectedProductRepository = SelectedProductRepository;
