"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const typeorm_1 = require("./config/typeorm");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Swagger 설정 옵션
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Pet Store API',
            version: '1.0.0',
            description: 'APIs for managing pet',
        },
        servers: [
            {
                url: `http://localhost:${port}`, // 서버 주소
            },
        ],
        components: {
            schemas: {
                User: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            description: 'User ID'
                        },
                        name: {
                            type: 'string',
                            description: 'User name'
                        },
                        email: {
                            type: 'string',
                            description: 'User email'
                        }
                    },
                    required: ['id', 'name', 'email']
                },
                CreateUserDto: {
                    type: 'object',
                    properties: {
                        name: {
                            type: 'string',
                            description: 'User name'
                        },
                        email: {
                            type: 'string',
                            description: 'User email'
                        }
                    },
                    required: ['name', 'email']
                }
            }
        }
    },
    apis: ['./src/routes/*.ts', './src/dtos/*.ts'], // API 경로 (라우트 및 DTO 경로)
};
// Swagger 문서 생성
const specs = (0, swagger_jsdoc_1.default)(options);
typeorm_1.AppDataSource.initialize().catch(error => console.log(error));
// Swagger UI 미들웨어 설정
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs));
app.use('/users', user_route_1.default);
// 기존 라우트 설정
app.get('/', (req, res) => {
    res.send('Hello, TypeScript with Express!');
});
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
