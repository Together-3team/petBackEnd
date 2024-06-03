import { Product, Review, User } from '../entities'
import { AppDataSource } from '../config/typeorm'

export class PaymentRepository {
  private reviewRepository = AppDataSource.getRepository(Review)
  private productRepository = AppDataSource.getRepository(Product)
  private userRepository = AppDataSource.getRepository(User)


}