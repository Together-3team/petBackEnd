"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtilityService = void 0;
const uuid_1 = require("uuid");
const dotenv = __importStar(require("dotenv"));
const aws_sdk_1 = require("aws-sdk");
dotenv.config();
class UtilityService {
    constructor() {
        /**
         * Presigned URL 생성
         * @param objectKey 업로드할 객체 키
         * @param contentType 업로드할 객체의 MIME 타입
         * @param bucketName
         * @returns 생성된 Presigned URL
         */
        this.generatePresignedUrl = async (objectKey, contentType, bucketName) => {
            try {
                return await this.s3.getSignedUrlPromise('putObject', {
                    Bucket: bucketName,
                    Key: objectKey,
                    Expires: 60 * 60,
                    ContentType: contentType,
                    ACL: "public-read",
                });
            }
            catch (error) {
                console.error("Error generating presigned URL:", error);
                throw error;
            }
        };
        /**
         * 유니크한 파일명 생성
         * @param originalName 원본 파일명
         * @returns 유니크한 파일명
         */
        this.generateUniqueFileName = (originalName) => {
            const extension = originalName.split('.').pop(); // 파일 확장자 추출
            return `${(0, uuid_1.v4)()}.${extension}`; // UUID를 이용한 유니크한 파일명 생성
        };
        /**
         * 중복을 피하고 유니크한 objectKey 생성 후 Presigned URL 생성
         * @returns 생성된 Presigned URL
         * @param items
         * @param bucketName
         */
        this.generatePresignedUrls = async (items, bucketName) => {
            const urls = [];
            for (const item of items) {
                const uniqueFileName = this.generateUniqueFileName(item.objectKey);
                const url = await this.generatePresignedUrl(uniqueFileName, item.contentType, bucketName);
                urls.push({ url, uniqueFileName, originalFileName: item.objectKey });
            }
            return urls;
        };
        this.s3 = new aws_sdk_1.S3({
            region: process.env.AWS_REGION,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            },
        });
    }
}
exports.UtilityService = UtilityService;
