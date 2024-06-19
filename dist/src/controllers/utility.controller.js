"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtilityController = void 0;
const services_1 = require("../services");
class UtilityController {
    constructor() {
        /**
         * PresignedUrl 생성
         * @param req
         * @param res
         */
        this.generatePresignedUrls = async (req, res) => {
            try {
                // 요청에서 필요한 데이터 추출
                const items = req.body.items;
                const bucketName = req.body.bucketName;
                if (!items || !Array.isArray(items) || items.length === 0) {
                    res.status(400).json({ error: 'items array is required and must not be empty' });
                    return;
                }
                // Presigned URL 생성
                const presignedUrl = await this.utilityService.generatePresignedUrls(items, bucketName);
                // 클라이언트에 응답 반환
                res.status(200).json({ presignedUrl });
            }
            catch (error) {
                console.error('Error generating presigned URL:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        };
        this.utilityService = new services_1.UtilityService();
    }
}
exports.UtilityController = UtilityController;
