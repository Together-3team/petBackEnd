import { Delivery, Product, Purchase, Review, User } from '../entities'
import { AppDataSource } from '../config/typeorm'
import { CreateDeliveryDto } from '../dtos'
import { InsertResult } from 'typeorm'
import { GroupBuying } from '../entities/group.buying.entity'

export class PaymentRepository {
  private reviewRepository = AppDataSource.getRepository(Review)
  private productRepository = AppDataSource.getRepository(Product)
  private userRepository = AppDataSource.getRepository(User)
  private purchaseRepository = AppDataSource.getRepository(Purchase)
  private groupBuyingRepository = AppDataSource.getRepository(GroupBuying)


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
      const purchase = await this.purchaseRepository.findOne({ where: { orderId: orderId }, relations: ['selectedProducts'] })
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
}