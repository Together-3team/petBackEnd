import { Product, Review, User } from '../entities'
import { AppDataSource } from '../config/typeorm'
import { ReviewCreateRequestDto } from '../dtos'

export class ReviewRepository {
  private reviewRepository = AppDataSource.getRepository(Review)
  private productRepository = AppDataSource.getRepository(Product)
  private userRepository = AppDataSource.getRepository(User)

  public createReview = async (reviewInfo: ReviewCreateRequestDto): Promise<Review> => {
    const { productId, userId, ...rest } = reviewInfo;

    if (productId === undefined) {
      throw new Error(`Product ID is undefined`);
    }
    if (userId === undefined) {
      throw new Error(`User ID is undefined`);
    }

    const product = await this.productRepository.findOne({ where: { id: productId } });
    if (!product) {
      throw new Error(`Product with ID ${productId} not found`);
    }

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }

    const review = this.reviewRepository.create({ product, user, ...rest });
    return await this.reviewRepository.save(review);
  }

  // productId에 해당하는 모든 Review를 가져오는 메서드
  public getReviewsByProductId = async (productId: number): Promise<Review[]> => {
    return await this.reviewRepository.find({
      where: { product: { id: productId } },
    });
  }
}