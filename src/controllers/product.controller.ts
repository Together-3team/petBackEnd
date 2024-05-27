import { Request, Response } from 'express';
import { ProductService } from '../services';
import { ProductList } from '../entities';

export class ProductController {
  private productService: ProductService;

  constructor() {
    this.productService = new ProductService();
  }

  public getProductList = async (req: Request, res: Response): Promise<void> => {
    try {
      const productList: ProductList[] = await this.productService.getProductList();
      res.json(productList);
    } catch(error) {
      const errorMessage = (error as Error).message;
      res.status(500).json({ error: errorMessage });
    }
  };
}