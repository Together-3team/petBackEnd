"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const src_1 = require("../src");
describe('POST /payments/confirm', () => {
    it('should confirm payment and return success', async () => {
        const paymentRequestDto = {
            selectedProductIds: '1,2,3',
            deliveryId: 1,
            userId: 1,
            amount: 1000,
            orderId: 'orderId123',
            paymentKey: 'paymentKey123',
        };
        const response = await (0, supertest_1.default)(src_1.app)
            .post('/payments/confirm')
            .send(paymentRequestDto)
            .expect(200);
        expect(response.body).toHaveProperty('success', true);
    });
    it('should return 500 if an error occurs', async () => {
        const paymentRequestDto = {
            selectedProductIds: '1,2,3',
            deliveryId: 1,
            userId: 1,
            amount: 1000,
            orderId: 'orderId123',
            paymentKey: 'invalidKey',
        };
        const response = await (0, supertest_1.default)(src_1.app)
            .post('/payments/confirm')
            .send(paymentRequestDto)
            .expect(500);
        expect(response.body).toHaveProperty('error', 'Internal Server Error');
    });
});
