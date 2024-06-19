"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const dtos_1 = require("../dtos");
const repositories_1 = require("../repositories");
const class_transformer_1 = require("class-transformer");
class UserService {
    constructor() {
        this.getUser = async (userId) => {
            const user = this.userRepository.findUserById(parseInt(userId));
            return (0, class_transformer_1.plainToInstance)(dtos_1.UserResponseDto, user);
        };
        this.getUserByNickname = async (nickname) => {
            const user = await this.userRepository.findUserByNickname(nickname);
            return user ? true : false;
        };
        this.createUser = async (userData) => {
            const user = this.userRepository.createUser(userData);
            return (0, class_transformer_1.plainToInstance)(dtos_1.UserResponseDto, user);
        };
        this.updateUser = async (userId, userData) => {
            const user = this.userRepository.updateUser(parseInt(userId), userData);
            return (0, class_transformer_1.plainToInstance)(dtos_1.UserResponseDto, user);
        };
        this.deleteUser = (userId) => {
            return this.userRepository.deleteUser(parseInt(userId));
        };
        this.userRepository = new repositories_1.UserRepository();
    }
}
exports.UserService = UserService;
