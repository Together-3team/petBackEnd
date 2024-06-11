import { DeliveryRepository, PaymentRepository, SelectedProductRepository, UserRepository } from '../repositories'
import axios from 'axios'
import { PaymentRequestDto } from '../dtos'
import { Purchase } from '../entities'
import { InsertResult } from 'typeorm'

export class PaymentService {
  private paymentRepository: PaymentRepository
  private selectedPaymentRepository: SelectedProductRepository
  private deliveryRepository: DeliveryRepository
  private userRepository: UserRepository

  constructor() {
    this.selectedPaymentRepository = new SelectedProductRepository();
    this.paymentRepository = new PaymentRepository();
    this.deliveryRepository = new DeliveryRepository();
    this.userRepository = new UserRepository();
  }

  public changedStatus = async (orderId: string): Promise<void> => {
    try {
      const changedStatus = await this.paymentRepository.updatePurchase(orderId, 1);
    } catch (error) {
      console.error(error);
      throw new Error('changedStatus error');
    }
  }

  public createPurchase = async (paymentRequestDto: PaymentRequestDto): Promise<InsertResult> => {

    const selectedProductList = await Promise.all((paymentRequestDto?.selectedProductIds?.split(',') ?? []).map(async (productId) => {
      return await this.selectedPaymentRepository.findSelectedProductById(Number(productId));
    }));

    const delivery = await this.deliveryRepository.findDeliveryById(paymentRequestDto?.deliveryId);

    const user = await this.userRepository.findUserById(paymentRequestDto?.userId);

    const newPurchase: Purchase = {
      selectedProducts: selectedProductList,
      delivery: delivery,
      user: user,
      amount: paymentRequestDto!.amount,
      discount: paymentRequestDto!.discount,
      orderId: paymentRequestDto!.orderId!,
      paymentKey: paymentRequestDto!.paymentKey!,
      createdAt: new Date(),
      id: 0,
      paymentStatus: 0,
      deliveryCompany: '',
      trackingNumber: '',
    }

    return await this.paymentRepository.create(newPurchase);
  }

  public paymentsConfirm = async (amount: number | undefined, orderId: string | undefined, paymentKey: string | undefined): Promise<void> => {
    const paymentSecretKey = process.env.PAYMENT_SECRET_KEY;

    if (!paymentSecretKey) {
      throw new Error('PAYMENT_SECRET_KEY is not defined');
    }

    try {
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
    } catch (error) {
      console.log(error)
      throw new Error(error as string);
    }
  }

}