import { Delivery, Product, Purchase, Review, User } from '../entities'
import { AppDataSource } from '../config/typeorm'
import { CreateDeliveryDto } from '../dtos'
import { InsertResult } from 'typeorm'

export class PaymentRepository {
  private reviewRepository = AppDataSource.getRepository(Review)
  private productRepository = AppDataSource.getRepository(Product)
  private userRepository = AppDataSource.getRepository(User)
  private purchaseRepository = AppDataSource.getRepository(Purchase)

  public create = async (newPurchase: Purchase): Promise<InsertResult> => {
    try {
      return await this.purchaseRepository.insert(newPurchase);
    } catch (error) {
      console.log(error);
      throw new Error('Failed to create Purchase');
    }
  }
}