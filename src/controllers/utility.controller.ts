import { Request, Response } from 'express';
import { UtilityService } from '../services';

export class UtilityController {
  private utilityService: UtilityService;

  constructor() {
    this.utilityService = new UtilityService();
  }

  /**
   * PresignedUrl 생성
   * @param req
   * @param res
   */
  public generatePresignedUrls = async (req: Request, res: Response): Promise<void> => {
    try {
      // 요청에서 필요한 데이터 추출
      const items: { objectKey: string, contentType?: string }[] = req.body.items;
      const bucketName: string = req.body.bucketName;

      if (!items || !Array.isArray(items) || items.length === 0) {
        res.status(400).json({ error: 'items array is required and must not be empty' });
        return;
      }

      // Presigned URL 생성
      const presignedUrl = await this.utilityService.generatePresignedUrls(items, bucketName);

      // 클라이언트에 응답 반환
      res.status(200).json({ presignedUrl });
    } catch (error) {
      console.error('Error generating presigned URL:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
}