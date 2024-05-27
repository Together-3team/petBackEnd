"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const repositories_1 = require("../repositories");
class UserService {
    constructor() {
        this.getUser = (userId) => {
            return this.userRepository.findUserById(userId);
        };
        this.createUser = (userData) => {
            return this.userRepository.createUser(userData);
        };
        this.updateUser = (userId, userData) => {
            return this.userRepository.updateUser(userId, userData);
        };
        this.deleteUser = (userId) => {
            return this.userRepository.deleteUser(userId);
        };
        this.userRepository = new repositories_1.UserRepository();
    }
}
exports.UserService = UserService;
