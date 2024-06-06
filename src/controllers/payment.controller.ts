import { NextFunction, Request, Response } from 'express'
import { PaymentService } from '../services';
import { PaymentRequestDto } from '../dtos'
import { plainToClass } from 'class-transformer'

export class PaymentController {
  private paymentService: PaymentService;

  constructor() {
    this.paymentService = new PaymentService();
  }

  // public webHook(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const webHookStatus = req.body.eventType;
  //     if (webHookStatus === 'PAYMENT_STATUS_CHANGED') {
  //       const { orderId, status, approvedAt } = req.body.data.orderId;
  //       if (status !== 'DONE') return res.status(400).json({ "result": "fail" })
  //       const paymentComplete = this.paymentService.
  //     }
  //     return res.status(200).send({ "result": "finish" })
  //   } catch (error) {
  //     res.status(500).json(error)
  //   }
  // }

  public paymentsConfirm = async (req: Request, res: Response): Promise<void> => {
    try {
      const paymentRequestDto: PaymentRequestDto = req.body

      const { amount, orderId, paymentKey } = paymentRequestDto;
      const response = await this.paymentService.paymentsConfirm(amount, orderId, paymentKey);

      res.status(200).json(response);
    } catch(error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  };

}