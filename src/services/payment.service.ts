import { DeliveryRepository, PaymentRepository, SelectedProductRepository, UserRepository } from '../repositories'
import axios from 'axios'
import { PaymentRequestDto } from '../dtos'
import { Purchase } from '../entities'

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

  public createPurchase = async (paymentRequestDto: PaymentRequestDto): Promise<void> => {
    console.log(paymentRequestDto);

    const selectedProductList = await Promise.all((paymentRequestDto?.selectedProductIds?.split(',') ?? []).map(async (productId) => {
      return await this.selectedPaymentRepository.findSelectedProductById(Number(productId));
    }));
    console.log(selectedProductList);

    const delivery = await this.deliveryRepository.findDeliveryById(paymentRequestDto?.deliveryId);
    console.log(delivery);

    const user = await this.userRepository.findUserById(paymentRequestDto?.userId);
    console.log(user);
    //
    // const newPurchase: Purchase = {
    //   selectedProducts: selectedProductList,
    //   delivery: delivery,
    //   user: user,
    //   amount: paymentRequestDto!.amount,
    //   discount: paymentRequestDto!.discount,
    //   orderId: paymentRequestDto!.orderId!,
    //   paymentKey: paymentRequestDto!.paymentKey!,
    // }

    // const createPurchase = await this.paymentRepository.create(newPurchase);

    // const findSelectedProduct =
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