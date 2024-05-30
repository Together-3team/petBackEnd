import { ReviewRepository } from '../repositories'
import { ReviewCreateRequestDto } from '../dtos'
import { Review } from '../entities'

export class ReviewService {
  private reviewRepository: ReviewRepository

  constructor() {
    this.reviewRepository = new ReviewRepository();
  }

  public createReview = (reviewInfo: ReviewCreateRequestDto): Promise<Review> => {
    return this.reviewRepository.createReview(reviewInfo)
  }
}