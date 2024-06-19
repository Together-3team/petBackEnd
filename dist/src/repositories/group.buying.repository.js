"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupBuyingRepository = void 0;
const entities_1 = require("../entities");
const typeorm_1 = require("../config/typeorm");
class GroupBuyingRepository {
    constructor() {
        this.groupBuyingRepository = typeorm_1.AppDataSource.getRepository(entities_1.GroupBuying);
        this.findById = (id) => {
            return this.groupBuyingRepository.findOneByOrFail({ id });
        };
        this.save = (groupBuying) => {
            return this.groupBuyingRepository.save(groupBuying);
        };
    }
}
exports.GroupBuyingRepository = GroupBuyingRepository;
