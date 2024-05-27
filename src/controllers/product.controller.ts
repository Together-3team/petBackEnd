import { Request, Response } from 'express';
import { ProductService } from '../services';
import { Product } from '../entities';
import { ProductListRequestDTO } from '../dtos'

// ProductController 클래스 정의
export class ProductController {
  private productService: ProductService;

  constructor() {
    // ProductService 인스턴스를 생성하여 초기화
    this.productService = new ProductService();
  }

  /**
   * 상품 목록 가져오는 메서드
   * @param req
   * @param res
   */
  public getProductList = async (req: Request<ProductListRequestDTO>, res: Response): Promise<void> => {
    try {
      // 쿼리 파라미터에서 페이지 번호와 페이지 크기를 추출
      // 페이지 번호와 페이지 크기가 제공되지 않은 경우 기본값 설정
      const page = req.query.page ? parseInt(req.query.page as any, 10) : 1;
      const pageSize = req.query.pageSize ? parseInt(req.query.pageSize as any, 10) : 5;

      // ProductService를 사용하여 상품 목록을 가져옴
      const productList: Product[] = await this.productService.getProductList(page, pageSize);
      res.json(productList);
    } catch(error) {
      const errorMessage = (error as Error).message;
      res.status(500).json({ error: errorMessage });
    }
  };
}