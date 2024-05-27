import { Product } from '../entities'
import { AppDataSource } from '../config/typeorm'

export class ProductRepository {
  private productListRepository = AppDataSource.getRepository(Product)

  public getProductList = (): Promise<Product[]> => {
    console.log('hihi');
    return this.productListRepository.find()
  }
}