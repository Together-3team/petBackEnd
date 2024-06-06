import { PaymentRepository } from '../repositories'
import axios from 'axios'

export class PaymentService {
  private paymentRepository: PaymentRepository

  constructor() {
    this.paymentRepository = new PaymentRepository();
  }

  public paymentsConfirm = async (amount: number | undefined, orderId: string | undefined, paymentKey: string | undefined): Promise<void> => {
    const paymentSecretKey = process.env.PAYMENT_SECRET_KEY;

    if (!paymentSecretKey) {
      throw new Error('PAYMENT_SECRET_KEY is not defined');
    }
    console.log(paymentSecretKey)

    return await axios.post('https://api.tosspayments.com/v1/payments/confirm', {
      amount,
      orderId,
      paymentKey,
    }, {
      headers: {
        Authorization: `Basic ${Buffer.from(`${paymentSecretKey}:`).toString('base64')}`,
        'Content-Type': 'application/json'
      }
    });
  }

}