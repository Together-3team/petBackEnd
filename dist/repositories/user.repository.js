"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const entities_1 = require("../entities");
const typeorm_1 = require("../config/typeorm");
class UserRepository {
    constructor() {
        this.userRepo = typeorm_1.AppDataSource.getRepository(entities_1.User);
        this.findUserById = (userId) => {
            return this.userRepo.findOneByOrFail({ id: parseInt(userId) });
        };
        this.createUser = (userData) => {
            const newUser = this.userRepo.create(userData);
            return this.userRepo.insert(newUser);
        };
        this.updateUser = (userId, userData) => {
            return this.userRepo.save({ ...userData, id: parseInt(userId) });
        };
        this.deleteUser = (userId) => {
            return this.userRepo.delete({ id: parseInt(userId) });
        };
    }
}
exports.UserRepository = UserRepository;
