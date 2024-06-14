import { Delivery, Product, Purchase, Review, User } from '../entities'
import { AppDataSource } from '../config/typeorm'
import { InsertResult } from 'typeorm'
import { GroupBuying } from '../entities'
import { PurchaseProduct } from '../entities/purchase.product.entity'

export class PaymentRepository {
  private reviewRepository = AppDataSource.getRepository(Review)
  private productRepository = AppDataSource.getRepository(Product)
  private userRepository = AppDataSource.getRepository(User)
  private purchaseRepository = AppDataSource.getRepository(Purchase)
  private groupBuyingRepository = AppDataSource.getRepository(GroupBuying)
  private purchaseProductRepository = AppDataSource.getRepository(PurchaseProduct)


  public createGroupBuying = async (newGroupBuying: GroupBuying) => {
    try {
      return await this.groupBuyingRepository.save(newGroupBuying);
    } catch (error) {
      console.error(error);
      throw new Error('');
    }
  }

  public updatePurchase = async (orderId: string, status: number): Promise<Purchase> => {
    try {
      const purchase = await this.purchaseRepository.findOne({ where: { orderId: orderId }, relations: ['purchaseProduct'] })
      console.log(purchase);

      if (!purchase) {
        throw new Error(`Purchase with orderId ${orderId} not found`);
      }

      purchase.paymentStatus = status;

      return await this.purchaseRepository.save(purchase);
    } catch (error) {
      console.log(error);
      throw new Error('');
    }
  }

  public create = async (newPurchase: Purchase): Promise<Purchase> => {
    try {
      return await this.purchaseRepository.save(newPurchase);
    } catch (error) {
      console.log(error);
      throw new Error('Failed to create Purchase');
    }
  }

  public createPurchaseProduct = async (newPurchaseProduct: PurchaseProduct): Promise<PurchaseProduct> => {
    try {
      console.log('newPurchaseProduct :::::: ', newPurchaseProduct);
      return await this.purchaseProductRepository.save(newPurchaseProduct);
    } catch (error) {

      console.log(error);
      throw new Error('Failed to create Purchase');
    }
  }
}