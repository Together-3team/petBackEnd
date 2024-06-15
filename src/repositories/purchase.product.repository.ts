import { AppDataSource } from '../config/typeorm'
import { PurchaseProduct } from '../entities'

export class PurchaseProductRepository {
  private purchaseProductRepository = AppDataSource.getRepository(PurchaseProduct)

  public updatePurchaseProductOrigin = (purchaseProduct: PurchaseProduct): Promise<PurchaseProduct> => {
    return this.purchaseProductRepository.save(purchaseProduct)
  }
}