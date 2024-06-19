"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
// Swagger 설정 옵션
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: '3Team Pet Store API',
            version: '1.0.2',
            description: 'APIs for managing pet',
        },
        servers: [
            {
                url: `http://${process.env.SWAGGER_PUBLIC_IP}:${process.env.SWAGGER_PORT}`, // 서버 주소
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    in: 'header',
                    name: 'Authorization',
                    description: 'Bearer Token',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
    },
    apis: ['./src/routes/*.ts', './src/dtos/*.ts', './src/dtos/**/*.ts', './src/entities/*.ts'], // API 경로 (라우트 및 DTO 경로)
};
// Swagger 문서 생성
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
const setupSwagger = () => {
    return swaggerSpec;
};
exports.setupSwagger = setupSwagger;
