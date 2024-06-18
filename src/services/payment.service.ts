import {
  DeliveryRepository, GroupBuyingRepository,
  PaymentRepository,
  ProductRepository,
  PurchaseProductRepository,
  SelectedProductRepository,
  UserRepository,
} from '../repositories'
import axios from 'axios'
import { PaymentRequestDto } from '../dtos'
import { Purchase, SelectedProduct, User } from '../entities'
import { GroupBuying } from '../entities'
import { PurchaseProduct } from '../entities'

export class PaymentService {
  private paymentRepository: PaymentRepository
  private selectedPaymentRepository: SelectedProductRepository
  private deliveryRepository: DeliveryRepository
  private userRepository: UserRepository
  private purchaseProductRepository: PurchaseProductRepository
  private productRepository: ProductRepository
  private groupBuyingRepository: GroupBuyingRepository

  constructor() {
    this.selectedPaymentRepository = new SelectedProductRepository();
    this.paymentRepository = new PaymentRepository();
    this.deliveryRepository = new DeliveryRepository();
    this.userRepository = new UserRepository();
    this.purchaseProductRepository = new PurchaseProductRepository();
    this.productRepository = new ProductRepository();
    this.groupBuyingRepository = new GroupBuyingRepository();
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
        new Error('No selected products found');
      }

      for (const purchaseProduct of purchaseProducts) {
        if (purchaseProduct.groupBuying) return;
        const productId = Number(purchaseProduct.productId);
        const product = await this.productRepository.getProductById(productId);
        const newGroupBuying = new GroupBuying();
        newGroupBuying.status = 0;
        newGroupBuying.product = product;
        newGroupBuying.purchaseProducts = [purchaseProduct];
        await this.paymentRepository.createGroupBuying(newGroupBuying)

        purchaseProduct.groupBuying = newGroupBuying;
        purchaseProduct.status = 2;
        await this.purchaseProductRepository.updatePurchaseProductOrigin(purchaseProduct);
      }
    } catch (error) {
      throw new Error('createGroupBuying Error');
    }
  }

  public toSelectedProductDTO = async (selectedProduct: SelectedProduct): Promise<SelectedProduct> => {
    return {
      id: selectedProduct.id,
      quantity: selectedProduct.quantity,
      status: selectedProduct.status,
      createdAt: selectedProduct.createdAt,
      user: selectedProduct.user,
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
      productId: product.optionCombination?.product?.id ?? '',
    } as unknown as PurchaseProduct; // Explicitly type-cast
  }

  public setGroupBuying = async (purchaseProduct: PurchaseProduct, groupBuyingId: number): Promise<void> => {
    const groupBuyingItem = await this.groupBuyingRepository.findById(groupBuyingId);

    if (!groupBuyingItem) {
      throw new Error('Group buy not found');
    }

    if (!groupBuyingItem.purchaseProducts) {
      groupBuyingItem.purchaseProducts = [];
    }

    groupBuyingItem.purchaseProducts.push(purchaseProduct);

    groupBuyingItem.status = 1;

    await this.groupBuyingRepository.save(groupBuyingItem);
  }

  public createPurchase = async (paymentRequestDto: PaymentRequestDto, user: User): Promise<Purchase> => {
    const purchaseProducts: PurchaseProduct[] = [];

    const groupBuyingId = paymentRequestDto?.groupBuyingId;

    const delivery = await this.deliveryRepository.findDeliveryById(paymentRequestDto?.deliveryId);

    const selectedProductList = await Promise.all((paymentRequestDto?.selectedProductIds?.split(',') ?? []).map(async (productId) => {
      const selectedProduct = await this.selectedPaymentRepository.findSelectedProductById(Number(productId));
      return this.toSelectedProductDTO(selectedProduct);
    }));

    for (const product of selectedProductList) {
      const newPurchaseProduct = await this.toPurchaseProduct(product, user);
      const purchaseProduct = await this.paymentRepository.createPurchaseProduct(newPurchaseProduct);

      if (groupBuyingId) await this.setGroupBuying(purchaseProduct, groupBuyingId);

      purchaseProducts.push(purchaseProduct);
    }

    const newPurchase: Purchase = {
      purchaseProducts: purchaseProducts,
      deliveryName: delivery.name,
      recipient: delivery.recipient,
      recipientPhoneNumber: delivery.recipientPhoneNumber,
      zipCode: delivery.zipCode,
      address: delivery.address,
      detailedAddress: delivery.detailedAddress,
      user,
      orderId: paymentRequestDto!.orderId!,
      paymentKey: paymentRequestDto!.paymentKey!,
      createdAt: new Date(),
      id: 0,
      paymentStatus: 0,
      deliveryMessage: paymentRequestDto!.deliveryMessage!
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
