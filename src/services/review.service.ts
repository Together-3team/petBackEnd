import { ReviewRepository } from '../repositories'
import { ResponseMyReviewDto, ReviewCreateRequestDto } from '../dtos'
import { PurchaseProduct, Review, User } from '../entities'

export class ReviewService {
  private reviewRepository: ReviewRepository

  constructor() {
    this.reviewRepository = new ReviewRepository();
  }

  public async getMyReview(user: User, reviewId: number): Promise<ResponseMyReviewDto | { error: string }> {
    const review = await this.reviewRepository.findById(reviewId);


    if (!review) {
      return { error: "Review not found" };
    }


    if (review.user?.id !== user.id) {
      return { error: "Unauthorized" };
    }

    return {
      id: review.id,
      rating: review.rating,
      reviewImages: review.reviewImages,
      description: review.description,
      combinationName: review.purchaseProduct.combinationName,
      title: review.purchaseProduct.title,
      createdAt: review.createdAt,
    };
  }

  public async removeReview(userId: number, reviewId: number): Promise<{ result: string } | { error: string }> {
    const review = await this.reviewRepository.findReviewById(reviewId);

    if (!review) {
      return { error: "Review not found" };
    }

    // 사용자 권한 확인: 자신의 리뷰만 삭제 가능
    if (review.user?.id !== userId) {
      return { error: "Unauthorized" };
    }

    await this.reviewRepository.softDelete(reviewId);

    return { result: "Success" };
  }

  public getReviewable = (userId: number, page: number, pageSize: number): Promise<PurchaseProduct[]> => {
    return this.reviewRepository.getReviewable(userId, page, pageSize);
  }

  public createReview = (userId: number,reviewInfo: ReviewCreateRequestDto): Promise<Review> => {
    return this.reviewRepository.createReview(userId, reviewInfo)
  }

  public getWroteReviews = (userId: number, page: number, pageSize: number): Promise<PurchaseProduct[]> => {
    return this.reviewRepository.getWroteReviews(userId, page, pageSize);
  }
}