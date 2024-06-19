"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentController = void 0;
const services_1 = require("../services");
class PaymentController {
    constructor() {
        this.paymentsConfirm = async (req, res) => {
            try {
                const paymentRequestDto = req.body;
                const user = req.user;
                const paymentInfo = await this.paymentService.createPurchase(paymentRequestDto, user);
                const { amount, orderId, paymentKey } = paymentRequestDto;
                await this.paymentService.paymentsConfirm(amount, orderId, paymentKey);
                res.status(200).json({ message: "Payment confirmed", result: true });
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(400).json({ error: error.message });
                }
                else {
                    res.status(500).json({ error: 'Internal Server Error' });
                }
            }
        };
        this.paymentService = new services_1.PaymentService();
        this.webHook = this.webHook.bind(this);
        this.paymentsConfirm = this.paymentsConfirm.bind(this);
    }
    async sendProductUpdateWebSocket(productIds) {
        try {
            for (const productId of productIds) {
                await this.groupBuyingGateway.sendProductUpdate(productId);
            }
        }
        catch (error) {
            console.error(error);
        }
    }
    async webHook(req, res, next) {
        try {
            console.log(req.body);
            const webHookStatus = req.body.eventType;
            if (webHookStatus === 'PAYMENT_STATUS_CHANGED') {
                const { orderId, status, approvedAt } = req.body.data;
                console.log(orderId, status, approvedAt);
                if (status !== 'DONE')
                    return res.status(400).json({ "result": "fail" });
                console.log('start');
                const paymentComplete = await this.paymentService.changedStatus(orderId);
                await this.paymentService.createGroupBuying(paymentComplete);
                const productIds = paymentComplete.purchaseProducts.map((pp) => pp.productId);
                console.log(productIds);
                await this.sendProductUpdateWebSocket(productIds);
            }
            return res.status(200).send({ "result": "finish" });
        }
        catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }
}
exports.PaymentController = PaymentController;
