import { Product, PurchaseProduct, Review, User } from '../entities'
import { AppDataSource } from '../config/typeorm'
import { ReviewCreateRequestDto } from '../dtos'

export class ReviewRepository {
  private reviewRepository = AppDataSource.getRepository(Review)
  private productRepository = AppDataSource.getRepository(Product)
  private userRepository = AppDataSource.getRepository(User)
  private purchaseProductRepository = AppDataSource.getRepository(PurchaseProduct)

  public async findReviewById(reviewId: number): Promise<Review | null> {
    return this.reviewRepository
      .createQueryBuilder('review')
      .leftJoinAndSelect('review.user', 'user')
      .where('review.id = :id', { id: reviewId })
      .getOne();
  }

  public async softDelete(reviewId: number): Promise<void> {
    await this.reviewRepository.update(reviewId, { isDeleted: 1 });
  }

  public getWroteReviews = async (userId: number, page: number, pageSize: number): Promise<PurchaseProduct[]> => {
    try {
      const skip = (page - 1) * pageSize;

      return await this.purchaseProductRepository.createQueryBuilder('purchaseProduct')
        .leftJoinAndSelect('purchaseProduct.review', 'review')
        .where('purchaseProduct.userId = :userId', { userId })
        .andWhere('review.isDeleted = :isDeleted', { isDeleted: 0 })
        .skip(skip)
        .take(pageSize)
        .getMany();
    } catch (error) {
      console.log(error)
      throw new Error('getReviewable ERROR')
    }
  }

  public getReviewable = async (userId: number, page: number, pageSize: number): Promise<PurchaseProduct[]> => {
    try {
      const skip = (page - 1) * pageSize;

      return await this.purchaseProductRepository.createQueryBuilder('purchaseProduct')
        .leftJoinAndSelect('purchaseProduct.review', 'review')
        .where('purchaseProduct.userId = :userId', { userId })
        .andWhere('purchaseProduct.status = :status', { status: 5 })
        .andWhere('review.id IS NULL')
        .skip(skip)
        .take(pageSize)
        .getMany();
    } catch (error) {
      console.log(error)
      throw new Error('getReviewable ERROR')
    }
  }

  public createReview = async (userId: number, reviewInfo: ReviewCreateRequestDto): Promise<Review> => {
    const { productId, purChaseProductId, ...rest } = reviewInfo;

    if (purChaseProductId === undefined) {
      throw new Error(`purChaseProduct ID is undefined`);
    }

    if (productId === undefined) {
      throw new Error(`Product ID is undefined`);
    }
    if (userId === undefined) {
      throw new Error(`User ID is undefined`);
    }

    const purchaseProduct = await this.purchaseProductRepository.findOne({ where: { id: purChaseProductId }})
    if (!purchaseProduct) {
      throw new Error(`Product with ID ${purChaseProductId} not found`);
    }

    const product = await this.productRepository.findOne({ where: { id: productId } });
    if (!product) {
      throw new Error(`Product with ID ${productId} not found`);
    }

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }

    const review = this.reviewRepository.create({ purchaseProduct, product, user, ...rest });
    return await this.reviewRepository.save(review);
  }

  // productId에 해당하는 모든 Review를 가져오는 메서드
  public getReviewsByProductId = async (productId: number): Promise<Review[]> => {
    return await this.reviewRepository.find({
      where: { product: { id: productId } },
    });
  }
}