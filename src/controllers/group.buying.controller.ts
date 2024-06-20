import { Request, Response } from 'express';
import { GroupBuyingService } from '../services'

export class GroupBuyingController {
  private groupBuyingService: GroupBuyingService;

  constructor() {
    this.groupBuyingService = new GroupBuyingService();
  }

  /**
   * 상품의 공동 구매 목록 가져오기
   * @param req
   * @param res
   */

  public getProductByGroupBuying = async (req: Request, res: Response): Promise<void> => {
    try {
      const pid = Number(req.params.pid);
      const productByGroupBuying = await this.groupBuyingService.getProductByGroupBuying(pid);
      res.status(200).json(productByGroupBuying);
    } catch (error) {
      const errorMessage = (error as Error).message;
      res.status(500).json({ error: errorMessage });
    }
  }
}