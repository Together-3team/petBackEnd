import express, { Router } from 'express'
import { PaymentController } from '../controllers'

const PaymentRouter: Router = express.Router()
const paymentController = new PaymentController();

/**
 * @swagger
 * tags:
 *   name: Payment
 *   description: 결제 관련 API
 */

PaymentRouter.post('/order-status', paymentController.orderStatus);

PaymentRouter.post('/webhook', paymentController.webHook)

export default PaymentRouter