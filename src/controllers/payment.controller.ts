import { NextFunction, Request, Response } from 'express'
import { PaymentService, WebSocketService } from '../services'
import { PaymentRequestDto } from '../dtos'
import { User } from '../entities'

export class PaymentController {
  private paymentService: PaymentService;
  private webSocketService!: WebSocketService;

  constructor() {
    this.paymentService = new PaymentService();
    this.webHook = this.webHook.bind(this);
    this.paymentsConfirm = this.paymentsConfirm.bind(this);
    this.sendProductUpdateWebSocket = this.sendProductUpdateWebSocket.bind(this);
    this.test = this.test.bind(this);
  }

  public setWebSocketService(webSocketService: WebSocketService) {
    this.webSocketService = webSocketService;
  }

  public async sendProductUpdateWebSocket(productIds: (number | undefined)[]) {
    try {
      const uniqueArray = [...new Set(productIds)];
      for (const productId of uniqueArray) {
        if (this.webSocketService) {
          this.webSocketService.sendProductUpdate(productId)
        } else {
          throw new Error('WebSocketService is not initialized');
        }
      }
    } catch (error) {
      console.error('Error in sendProductUpdateWebSocket:', error);
      throw error; // 예외를 호출자로 전파하거나 적절히 처리
    }
  }

  public async test() {
    try {
      await this.sendProductUpdateWebSocket([1,3]);
    } catch (error) {
      console.log(error);
    }
  }

  public async webHook(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.body);
      const webHookStatus = req.body.eventType;
      if (webHookStatus === 'PAYMENT_STATUS_CHANGED') {
        const { orderId, status, approvedAt } = req.body.data;
        console.log(orderId, status, approvedAt);
        if (status !== 'DONE') return res.status(400).json({ "result": "fail" })
        console.log('start');
        const paymentComplete = await this.paymentService.changedStatus(orderId);
        await this.paymentService.createGroupBuying(paymentComplete);
        const productIds = paymentComplete.purchaseProducts.map((pp) => pp.productId);
        console.log(productIds);
        await this.sendProductUpdateWebSocket(productIds);
      }
      return res.status(200).send({ "result": "finish" })
    } catch (error) {
      console.log(error);
      res.status(500).json(error)
    }
  }

  public paymentsConfirm = async (req: Request, res: Response): Promise<void> => {
    try {
      const paymentRequestDto: PaymentRequestDto = req.body

      const user = req.user as User;

      const paymentInfo = await this.paymentService.createPurchase(paymentRequestDto, user);

      const { amount, orderId, paymentKey } = paymentRequestDto;
      await this.paymentService.paymentsConfirm(amount, orderId, paymentKey);

      res.status(200).json({ message: "Payment confirmed", result: true });
    } catch(error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  };

}