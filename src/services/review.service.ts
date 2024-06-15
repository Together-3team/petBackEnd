import { ReviewRepository } from '../repositories'
import { ReviewCreateRequestDto } from '../dtos'
import { PurchaseProduct, Review } from '../entities'

export class ReviewService {
  private reviewRepository: ReviewRepository

  constructor() {
    this.reviewRepository = new ReviewRepository();
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