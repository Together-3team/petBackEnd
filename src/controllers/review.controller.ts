import { Request, Response } from 'express';
import { ReviewService } from '../services';
import { ReviewCreateRequestDto } from '../dtos'
import { User } from '../entities'

export class ReviewController {
  private reviewService: ReviewService;

  constructor() {
    this.reviewService = new ReviewService();
  }

  /**
   * 리뷰 생성 메서드
   * @param req
   * @param res
   */
  public createReview = async (req: Request, res: Response): Promise<void> => {
    try {
      const createReviewDto: ReviewCreateRequestDto = req.body;

      const createReview = await this.reviewService.createReview(createReviewDto);
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
      console.log(user.id);

      res.status(200).json({"result": "Success"});
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
      console.log(req);

      res.status(200).json({"result": "Success"});
    } catch(error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  };
}