import { Request, Response } from 'express';
import { ProductService } from '../services';
import { Product } from '../entities';
import { ProductDetailResponseDTO, ProductListRequestDTO } from '../dtos'

export class ProductController {
  private productService: ProductService;

  constructor() {
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
      const productList: Product[] = await this.productService.getProductList(page, pageSize, 0);
      res.json(productList);
    } catch(error) {
      const errorMessage = (error as Error).message;
      res.status(500).json({ error: errorMessage });
    }
  };

  /**
   * 상품 목록 가져오는 메서드
   * @param req
   * @param res
   */

  public getProductDetail = async (req: Request, res: Response): Promise<void> => {
    try {
      const productId = parseInt(req.params.id, 10);
      if (isNaN(productId)) {
        res.status(400).json({ error: 'Invalid product id' });
        return
      }

      const productInfo: ProductDetailResponseDTO | null = await this.productService.getProductDetail(productId);
      if (productId) {
        res.status(200).json(productInfo);
      } else {
        res.status(404).json({ error: 'Product not found' });
      }
    } catch (error) {
      const errorMessage = (error as Error).message;
      res.status(500).json({ error: errorMessage });
    }
  }
}