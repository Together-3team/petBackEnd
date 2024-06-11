import { Delivery, Product, Purchase, Review, User } from '../entities'
import { AppDataSource } from '../config/typeorm'
import { CreateDeliveryDto } from '../dtos'

export class PaymentRepository {
  private reviewRepository = AppDataSource.getRepository(Review)
  private productRepository = AppDataSource.getRepository(Product)
  private userRepository = AppDataSource.getRepository(User)

  // public create = async (newPurchase: Purchase): Promise<void> => {
  //   const newDelivery = this.deliveryRepo.create({...deliveryData, user})
  //   const result = await this.deliveryRepo.insert(newDelivery)
  //   return this.deliveryRepo.findOneByOrFail({id: result.identifiers[0].id})
  // }
}