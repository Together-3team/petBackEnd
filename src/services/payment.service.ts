import { PaymentRepository } from '../repositories'
import axios from 'axios'

export class PaymentService {
  private paymentRepository: PaymentRepository

  constructor() {
    this.paymentRepository = new PaymentRepository();
  }

  public orderStatus = async (amount: number | undefined, orderId: string | undefined, orderName: string | undefined): Promise<void> => {
    const paymentSecretKey = process.env.PAYMENT_SECRET_KEY;

    if (!paymentSecretKey) {
      throw new Error('PAYMENT_SECRET_KEY is not defined');
    }
    console.log(paymentSecretKey)

    return await axios.post('https://api.tosspayments.com/v1/payments/confirm', {
      amount,
      orderId,
      orderName,
    }, {
      headers: {
        Authorization: `Basic ${Buffer.from(`${paymentSecretKey}:`).toString('base64')}`,
        'Content-Type': 'application/json'
      }
    });
  }

}