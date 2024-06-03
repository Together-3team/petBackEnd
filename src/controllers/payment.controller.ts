import { NextFunction, Request, Response } from 'express'
import { PaymentService } from '../services';
import { PaymentRequestDto } from '../dtos'
import { plainToClass } from 'class-transformer'

export class PaymentController {
  private paymentService: PaymentService;

  constructor() {
    this.paymentService = new PaymentService();
  }

  public webHook(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req);
      return res.status(200).send({ "result": "finish" })
    } catch (error) {
      res.status(500).json(error)
    }
  }

  public orderStatus = async (req: Request, res: Response): Promise<void> => {
    try {
      const paymentRequestDto: PaymentRequestDto = req.body

      const { amount, orderId, orderName } = paymentRequestDto;
      const response = await this.paymentService.orderStatus(amount, orderId, orderName);

      res.status(200).json(response);
    } catch(error) {
      console.log(error)
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  };

}