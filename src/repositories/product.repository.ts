import { ProductList } from '../entities'
import { AppDataSource } from '../config/typeorm'

export class ProductRepository {
  private productListRepository = AppDataSource.getRepository(ProductList)

  public getProductList = (): Promise<ProductList[]> => {
    return this.productListRepository.find()
  }
}