"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZzimController = void 0;
const services_1 = require("../services");
class ZzimController {
    constructor() {
        this.getZzimsByUser = async (req, res) => {
            const user = req.user;
            try {
                const Zzims = await this.zzimService.getZzimsByUser(user);
                res.json(Zzims);
            }
            catch (error) {
                const errorMessage = error.message;
                res.status(500).json({ error: errorMessage });
            }
        };
        this.createZzim = async (req, res) => {
            const zzimData = req.body;
            const user = req.user;
            try {
                const zzim = await this.zzimService.createZzim(zzimData, user);
                res.json(zzim);
            }
            catch (error) {
                const errorMessage = error.message;
                res.status(500).json({ error: errorMessage });
            }
        };
        this.deleteZzim = async (req, res) => {
            const zzimId = req.params.id;
            const user = req.user;
            try {
                await this.zzimService.getZzimById(zzimId, user);
                const result = await this.zzimService.deleteZzim(zzimId);
                res.json(result);
            }
            catch (error) {
                const errorMessage = error.message;
                res.status(500).json({ error: errorMessage });
            }
        };
        this.zzimService = new services_1.ZzimService();
    }
}
exports.ZzimController = ZzimController;
