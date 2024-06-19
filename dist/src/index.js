"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.passport = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const typeorm_1 = require("./config/typeorm");
const swagger_1 = require("../swagger");
const routes_1 = require("./routes");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const passport_1 = __importDefault(require("passport"));
exports.passport = passport_1.default;
require("./passport");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
exports.app = app;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(passport_1.default.initialize());
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
typeorm_1.AppDataSource.initialize().catch(error => console.log(error));
// 스웨거 기본 세팅
const swaggerSpec = (0, swagger_1.setupSwagger)();
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
// users 라우터 세팅
app.use('/users', routes_1.UserRouter);
// products 라우터 세팅
app.use('/products', routes_1.ProductRouter);
// auth 라우터 세팅
app.use('/auth', routes_1.AuthRouter);
// review 라우터 세팅
app.use('/review', routes_1.ReviewRouter);
// utility 라우터 세팅
app.use('/utility', routes_1.Utility);
// delivery 라우터 세팅
app.use('/deliveries', routes_1.DeliveryRouter);
// zzim 라우터 세팅
app.use('/zzims', routes_1.ZzimRouter);
// payment 라우터 세팅
app.use('/payments', routes_1.PaymentRouter);
// selecetProduct 라우터 세팅
app.use('/selected-products', routes_1.SelectedProductRouter);
// purchase 라우터 세팅
app.use('/purchases', routes_1.PurchaseRouter);
// 기존 라우트 설정
app.get('/', (req, res) => {
    res.send('Hello, TypeScript with Express!');
});
const PORT = process.env.SERVER_PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
