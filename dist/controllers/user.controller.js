"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const services_1 = require("../services");
class UserController {
    constructor() {
        this.getUser = async (req, res) => {
            const userId = req.params.id;
            // @ts-ignore
            try {
                const user = await this.userService.getUser(userId);
                res.json(user);
            }
            catch (error) {
                const errorMessage = error.message;
                res.status(500).json({ error: errorMessage });
            }
        };
        this.createUser = async (req, res) => {
            const userData = req.body;
            try {
                const result = await this.userService.createUser(userData);
                res.json(result);
            }
            catch (error) {
                const errorMessage = error.message;
                res.status(500).json({ error: errorMessage });
            }
        };
        this.updateUser = async (req, res) => {
            const userId = req.params.id;
            const userData = req.body;
            try {
                this.userService.getUser(userId);
                const updatedUser = this.userService.updateUser(userId, userData);
                res.json(updatedUser);
            }
            catch (error) {
                const errorMessage = error.message;
                res.status(500).json({ error: errorMessage });
            }
        };
        this.deleteUser = async (req, res) => {
            const userId = req.params.id;
            try {
                const result = await this.userService.deleteUser(userId);
                res.json(result);
            }
            catch (error) {
                const errorMessage = error.message;
                res.status(500).json({ error: errorMessage });
            }
        };
        this.userService = new services_1.UserService();
    }
}
exports.UserController = UserController;
