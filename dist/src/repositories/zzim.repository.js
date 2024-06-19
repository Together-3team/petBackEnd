"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZzimRepository = void 0;
const entities_1 = require("../entities");
const typeorm_1 = require("../config/typeorm");
class ZzimRepository {
    constructor() {
        this.zzimRepo = typeorm_1.AppDataSource.getRepository(entities_1.Zzim);
        this.findZzimById = async (id, user) => {
            return this.zzimRepo.findOneByOrFail({ id, user: { id: user.id } });
        };
        this.findZzimByUserAndProductId = async (productId, user) => {
            return this.zzimRepo.findOneBy({ user: { id: user.id }, product: { id: productId } });
        };
        this.findZzimsByUser = async (user) => {
            return this.zzimRepo.findBy({ user: { id: user.id } });
        };
        this.createZzim = async (zzimData, user) => {
            const newZzim = this.zzimRepo.create({ ...zzimData, user });
            const result = await this.zzimRepo.insert(newZzim);
            return this.zzimRepo.findOneByOrFail({ id: result.identifiers[0].id });
        };
        this.deleteZzim = (id) => {
            return this.zzimRepo.delete({ id });
        };
    }
}
exports.ZzimRepository = ZzimRepository;
