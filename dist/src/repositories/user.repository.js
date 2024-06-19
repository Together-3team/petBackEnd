"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const entities_1 = require("../entities");
const typeorm_1 = require("../config/typeorm");
class UserRepository {
    constructor() {
        this.userRepo = typeorm_1.AppDataSource.getRepository(entities_1.User);
        this.findUserById = async (id) => {
            if (id === undefined) {
                throw new Error('User ID is undefined');
            }
            return this.userRepo.findOneByOrFail({ id });
        };
        this.findUserBySNS = async (snsId, provider) => {
            return this.userRepo.findOneBy({ snsId, provider });
        };
        this.findUserByNickname = async (nickname) => {
            return this.userRepo.findOneBy({ nickname });
        };
        this.createUser = async (userData) => {
            const newUser = this.userRepo.create(userData);
            const result = await this.userRepo.insert(newUser);
            return this.userRepo.findOneByOrFail({ id: result.identifiers[0].id });
        };
        this.updateUser = async (id, userData) => {
            await this.userRepo.save({ ...userData, id });
            return this.userRepo.findOneByOrFail({ id });
        };
        this.deleteUser = (id) => {
            return this.userRepo.softDelete({ id });
        };
    }
}
exports.UserRepository = UserRepository;
