import { AppDataSource } from '../config/typeorm'
import { PurchaseProductUpdateRequestDto } from '../dtos'
import { PurchaseProduct, User } from '../entities'

export class PurchaseProductRepository {
  private purchaseProductRepository = AppDataSource.getRepository(PurchaseProduct)

  public updatePurchaseProduct = async (id: number, purchaseProductData: PurchaseProductUpdateRequestDto, user: User): Promise<PurchaseProduct> => {
    await this.purchaseProductRepository.findOneByOrFail({id, user: {id: user.id}})
    await this.purchaseProductRepository.save({...purchaseProductData, id})
    return this.purchaseProductRepository.findOneByOrFail({id})
  }

  public updatePurchaseProductOrigin = (purchaseProduct: PurchaseProduct): Promise<PurchaseProduct> => {
    return this.purchaseProductRepository.save(purchaseProduct)
  }

  public getRecentPurchaseProduct = (user: User): Promise<PurchaseProduct[]> => {
    return this.purchaseProductRepository.find({ order: { createdAt: 'DESC' }, take: 1 })
  }
}