import { DeliveryRepository, PaymentRepository, PurchaseProductRepository, SelectedProductRepository, UserRepository } from '../repositories'
import axios from 'axios'
import { PaymentRequestDto } from '../dtos'
import { Purchase, SelectedProduct, User } from '../entities'
import { InsertResult } from 'typeorm'
import { GroupBuying } from '../entities'
import { PurchaseProduct } from '../entities/purchase.product.entity'

export class PaymentService {
  private paymentRepository: PaymentRepository
  private selectedPaymentRepository: SelectedProductRepository
  private deliveryRepository: DeliveryRepository
  private userRepository: UserRepository
  private purchaseProductRepository: PurchaseProductRepository

  constructor() {
    this.selectedPaymentRepository = new SelectedProductRepository();
    this.paymentRepository = new PaymentRepository();
    this.deliveryRepository = new DeliveryRepository();
    this.userRepository = new UserRepository();
    this.purchaseProductRepository = new PurchaseProductRepository();
  }

  public changedStatus = async (orderId: string): Promise<Purchase> => {
    try {
      return await this.paymentRepository.updatePurchase(orderId, 1);
    } catch (error) {
      console.error(error);
      throw new Error('changedStatus error');
    }
  }

  public createGroupBuying = async (paymentComplete: Purchase): Promise<void> => {
    try {
      const purchaseProducts = paymentComplete.purchaseProducts;

      if (!purchaseProducts || purchaseProducts.length === 0) {
        throw new Error('No selected products found');
      }

      for (const purchaseProduct of purchaseProducts) {
        const newGroupBuying = new GroupBuying();
        newGroupBuying.status = 0; // Example status, change as needed
        newGroupBuying.purchaseProducts = [purchaseProduct];
        await this.paymentRepository.createGroupBuying(newGroupBuying)

        purchaseProduct.groupBuying = newGroupBuying;
        purchaseProduct.status = 2;
        await this.purchaseProductRepository.updatePurchaseProductOrigin(purchaseProduct);
      }

    } catch (error) {
      console.error(error);
      throw new Error('createGroupBuyingError');
    }
  }

  public toSelectedProductDTO = async (selectedProduct: SelectedProduct): Promise<SelectedProduct> => {
    return {
      id: selectedProduct.id,
      quantity: selectedProduct.quantity,
      status: selectedProduct.status,
      createdAt: selectedProduct.createdAt,
      user: {
        snsId: selectedProduct.user.snsId,
        provider: selectedProduct.user.provider,
        isSubscribedToPromotions: selectedProduct.user.isSubscribedToPromotions,
        preferredPet: selectedProduct.user.preferredPet,
        email: selectedProduct.user.email,
        nickname: selectedProduct.user.nickname,
        phoneNumber: selectedProduct.user.phoneNumber,
        profileImage: selectedProduct.user.profileImage,
        id: selectedProduct.user.id,
        createdAt: selectedProduct.user.createdAt,
      },
      optionCombination: {
        id: selectedProduct.optionCombination.id,
        optionCombination: selectedProduct.optionCombination.optionCombination,
        combinationPrice: selectedProduct.optionCombination.combinationPrice,
        combinationName: selectedProduct.optionCombination.combinationName,
        createdAt: selectedProduct.optionCombination.createdAt,
        amount: selectedProduct.optionCombination.amount,
        product: selectedProduct.optionCombination.product,
      },
    };
  }

  public toPurchaseProduct = async (product: SelectedProduct, user: User): Promise<PurchaseProduct> => {
    return {
      createdAt: new Date(), // Set to current date or any valid Date object
      combinationPrice: product.optionCombination?.combinationPrice ?? 0,
      deliveryCompany: '',
      combinationName: product.optionCombination?.combinationName ?? '',
      originalPrice: product.optionCombination?.product?.originalPrice ?? 0,
      price: product.optionCombination?.product?.price ?? 0,
      quantity: product.quantity,
      status: 0,
      thumbNailImage: product.optionCombination?.product?.thumbNailImage ?? '',
      title: product.optionCombination?.product?.title ?? '',
      trackingNumber: '',
      user: user,
    } as unknown as PurchaseProduct; // Explicitly type-cast
  }

  public createPurchase = async (paymentRequestDto: PaymentRequestDto): Promise<Purchase> => {

    const purchaseProducts: PurchaseProduct[] = [];

    const delivery = await this.deliveryRepository.findDeliveryById(paymentRequestDto?.deliveryId);

    const user = await this.userRepository.findUserById(paymentRequestDto?.userId);

    const selectedProductList = await Promise.all((paymentRequestDto?.selectedProductIds?.split(',') ?? []).map(async (productId) => {
      const selectedProduct = await this.selectedPaymentRepository.findSelectedProductById(Number(productId));
      return this.toSelectedProductDTO(selectedProduct);
    }));

    for (const product of selectedProductList) {

      const newPurchaseProduct = await this.toPurchaseProduct(product, user);


      await this.paymentRepository.createPurchaseProduct(newPurchaseProduct);

      purchaseProducts.push(newPurchaseProduct);
    }

    const newPurchase: Purchase = {
      purchaseProducts: purchaseProducts,
      delivery: delivery,
      user: user,
      orderId: paymentRequestDto!.orderId!,
      paymentKey: paymentRequestDto!.paymentKey!,
      createdAt: new Date(),
      id: 0,
      paymentStatus: 0,
    }

    console.log(newPurchase)

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