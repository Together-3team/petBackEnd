import { Product } from '../entities'
import { ProductRepository } from '../repositories'

export class ProductService {
  private productRepository: ProductRepository

  constructor() {
    this.productRepository = new ProductRepository();
  }

  public getProductList = (): Promise<Product[]> => {
    return this.productRepository.getProductList()
  }
}