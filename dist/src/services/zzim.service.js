"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZzimService = void 0;
const dtos_1 = require("../dtos");
const repositories_1 = require("../repositories");
const class_transformer_1 = require("class-transformer");
class ZzimService {
    constructor() {
        this.getZzimById = async (zzimId, user) => {
            const zzim = this.zzimRepository.findZzimById(parseInt(zzimId), user);
            return (0, class_transformer_1.plainToInstance)(dtos_1.ZzimResponseDto, zzim);
        };
        this.getZzimsByUser = async (user) => {
            const zzims = await this.zzimRepository.findZzimsByUser(user);
            return zzims.map(zzim => (0, class_transformer_1.plainToInstance)(dtos_1.ZzimResponseDto, zzim));
        };
        this.createZzim = async (zzimData, user) => {
            const Zzim = await this.zzimRepository.findZzimByUserAndProductId(zzimData.productId, user);
            if (Zzim)
                throw new Error("해당 상품의 위시리스트가 존재합니다");
            const zzim = this.zzimRepository.createZzim(zzimData, user);
            return (0, class_transformer_1.plainToInstance)(dtos_1.ZzimResponseDto, zzim);
        };
        this.deleteZzim = (zzimId) => {
            return this.zzimRepository.deleteZzim(parseInt(zzimId));
        };
        this.zzimRepository = new repositories_1.ZzimRepository();
    }
}
exports.ZzimService = ZzimService;
