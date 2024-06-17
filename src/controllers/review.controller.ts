import { Request, Response } from 'express';
import { ReviewService } from '../services';
import { ReviewCreateRequestDto } from '../dtos'
import { PurchaseProduct, User } from '../entities'

export class ReviewController {
  private reviewService: ReviewService;

  constructor() {
    this.reviewService = new ReviewService();
  }

  public removeReview = async (req: Request, res: Response): Promise<void> => {
    try {
      const user = req.user as User;
      user.id = 1;
      const reviewId = parseInt(req.params.rid, 10);

      const result = await this.reviewService.removeReview(user.id, reviewId);

      if ('error' in result) {
        res.status(403).json({ error: result.error });
      } else {
        res.status(200).json({ result: result.result });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  /**
   * 리뷰 생성 메서드
   * @param req
   * @param res
   */
  public createReview = async (req: Request, res: Response): Promise<void> => {
    try {
      const createReviewDto: ReviewCreateRequestDto = req.body;

      const user = req.user as User;
      const createReview = await this.reviewService.createReview(user.id, createReviewDto);
      res.status(200).json({"result": "Success"});
    } catch(error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  };

  public getReviewable = async (req: Request, res: Response): Promise<void> => {
    try {
      const user = req.user as User;
      const page = parseInt(req.query.page as string, 10) || 1;
      const pageSize = parseInt(req.query.pageSize as string, 10) || 2;

      const reviewAbleProduct = await this.reviewService.getReviewable(user.id, page, pageSize);

      res.status(200).json(reviewAbleProduct);
    } catch(error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  };

  public getWroteReviews = async (req: Request, res: Response): Promise<void> => {
    try {
      const user = req.user as User;
      const page = parseInt(req.query.page as string, 10) || 1;
      const pageSize = parseInt(req.query.pageSize as string, 10) || 2;


      const reviewWroteProduct = await this.reviewService.getWroteReviews(user.id, page, pageSize);

      res.status(200).json(reviewWroteProduct);
    } catch(error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  };
}