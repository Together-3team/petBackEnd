import { User, Purchase, SelectedProduct, PurchaseProduct, Delivery } from '../entities'
import { AppDataSource } from '../config/typeorm'
import { PurchaseCreateRequestDto, PurchaseUpdateRequestDto } from '../dtos'
import { DeleteResult } from 'typeorm'

export class PurchaseRepository {
  private purchaseRepo = AppDataSource.getRepository(Purchase)
  private purchaseProductRepo = AppDataSource.getRepository(PurchaseProduct)
  private selectedProductRepo = AppDataSource.getRepository(SelectedProduct)
  private deliveryRepo = AppDataSource.getRepository(Delivery)

  public findPurchaseById = async (id: number, user: User): Promise<Purchase> => {
    return this.purchaseRepo.findOneByOrFail({id, user: {id: user.id}})
  }
  
  public findPurchasesByUser = async (user: User): Promise<Purchase[]> => {
    return this.purchaseRepo.findBy({user: {id: user.id}})
  }

  public createPurchase = async (purchaseData: PurchaseCreateRequestDto, user: User): Promise<Purchase> => {
    // @ts-ignore
    const delivery = await this.deliveryRepo.findOneByOrFail({id: purchaseData.deliveryId})
    const newPurchase = this.purchaseRepo.create({
      user,
      deliveryName: delivery.name,
      recipient: delivery.recipient,
      recipientPhoneNumber: delivery.recipientPhoneNumber,
      zipCode: delivery.zipCode,
      address: delivery.address,
      detailedAddress: delivery.detailedAddress,
      orderId: purchaseData.orderId,
      paymentKey: purchaseData.paymentKey,
      deliveryMessage: purchaseData.deliveryMessage
    })
    const result = await this.purchaseRepo.insert(newPurchase)
    const purchase = await this.purchaseRepo.findOneByOrFail({id: result.identifiers[0].id})
    for (const id of purchaseData.selectedProductIds) {
      const selectedProduct = await this.selectedProductRepo.findOneOrFail({
        relations: ['optionCombination', 'optionCombination.product'],
        where: {id}
      })
      console.log(id, selectedProduct)
      const newPurchaseProduct = this.purchaseProductRepo.create({
        purchase,
        user,
        title: selectedProduct.optionCombination.product.title,
        combinationName: selectedProduct.optionCombination.combinationName,
        quantity: selectedProduct.quantity,
        originalPrice: selectedProduct.optionCombination.product.originalPrice,
        price: selectedProduct.optionCombination.product.price,
        combinationPrice: selectedProduct.optionCombination.combinationPrice,
        thumbNailImage: selectedProduct.optionCombination.product.thumbNailImage,
        productId: selectedProduct.optionCombination.product.id
      })
      await this.purchaseProductRepo.insert(newPurchaseProduct)
      await this.selectedProductRepo.delete({id})
    }
    return this.purchaseRepo.findOneByOrFail({id: result.identifiers[0].id})
  }

  public getRecentPurchase = async (user: User): Promise<Purchase[]> => {
    return this.purchaseRepo.find({ where: { user: { id: user.id } }, order: { createdAt: 'DESC' }, take: 1 })
  }

  public updatePurchase = async (id: number, purchaseData: PurchaseUpdateRequestDto, user: User): Promise<Purchase> => {
    await this.purchaseRepo.findOneByOrFail({id, user: {id: user.id}})
    await this.purchaseRepo.save({...purchaseData, id})
    return this.purchaseRepo.findOneByOrFail({id})
  }

  public deletePurchase = (id: number): Promise<DeleteResult> => {
    return this.purchaseRepo.delete({id})
  }
}